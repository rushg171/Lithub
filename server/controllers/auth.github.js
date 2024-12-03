const express = require("express");
const GithubIntegrations = require("../models/github-integrations");
const GithubAuthService = require("../services/githubAuthService");
const GithubService = require("../services/githubService");
const IntegrationService = require("../services/integrationService");
const jwt = require("jsonwebtoken");

const controller = {
    redirectToAuthorize: async (req, res, next)=>{
        const clientId = process.env.GITHUB_CLIENT_ID;

        const scopes = ['repo', 'read:user', 'user:email', 'admin:org'];
        if(!clientId){
            res.send("Please try again in some time");
            console.error("Client ID missing");
            return;
        }
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scopes.join(' ')}`);
    },

    callback: async (req, res, next)=>{
        try {
            const {code} = req.query;
            console.log(code);
            const result = await GithubAuthService.getAccessToken(code);
            console.log(result);
            const user = await GithubService.getUserDetails(result.access_token);
            const existingUser = await IntegrationService.findByGithubId(user.id);
            if(existingUser){
                const token = jwt.sign(
                    {
                        userId: existingUser._id,
                        githubId: user.id,
                    },
                    process.env.SIGNING_SECRET,
                )
                
                res.cookie("githubIntegrationToken", token, {
                    httpOnly: true,
                    secure: false, 
                    maxAge: 3600000,
                });
                res.json({"success":true, "message":"User already exists!"})
                return
            }
            const githubUser = {
                githubId: user.id,
                name: user.name,
                username: user.login,
                email: user.email,
                profileUrl: user.html_url,
                avatarUrl: user.avatar_url,
                accessToken: result.access_token,
            }
            const integration = await IntegrationService.createIntegration(githubUser);
            console.log(integration);
            if(!integration._id){
                return Error("No user created.");
            }
            const token = jwt.sign(
                {
                    userId: integration._id,
                    githubId: integration.githubId,
                },
                process.env.SIGNING_SECRET,
            )
            res.cookie("githubIntegrationToken", token, {
                httpOnly: true,
                secure: false, 
                maxAge: 3600000,
            });
            res.json({"success":true, "message":"User Created Successfully!"});
        }
        catch (error) {
            console.log(error)
            res.status(400).send('Invalid request'); 
        }
    }
}

module.exports = controller;