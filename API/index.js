const api = require("./api")
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const arrDir = ["SharpSpin", "async-samples", "blip-client-testing-csharp", "telegram.bot"];

app.listen(port, () => {
    console.log("Server is running");
});

app.get("/getReposInfo", async (req, res) => {
    try {
        const allRepoData = {
            avatarUrl: "",
            repoArr: []
        };
        for (const repo of arrDir) {
            let { data } = await api.get("repos/takenet/" + repo)
                .catch((err) => {
                    throw err
                })
            allRepoData.repoArr.push({
                repoFullName: data.full_name,
                repoDesc: data.description,
            });
            allRepoData.avatarUrl = data.owner.avatar_url
        }
        res.send(allRepoData)
    }
    catch (err) {
        res.send(err.response.data)
    }
});

