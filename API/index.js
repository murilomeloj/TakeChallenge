const api = require("./gitApi")
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const selectedRepos = 5;

app.listen(port, () => {
    console.log("Server is running");
});

app.get("/getReposInfo", async (req, res) => {
    try {
        let { data } = await api.get("orgs/takenet/repos?sort=created&direction=asc") //Get all repos sorted by 'create date'
        const filteredArray = data.filter(repo => repo.language === "C#")
        while (filteredArray.length < selectedRepos) {  //performs paging as long as the filtered repositories array size is smaller than the specified amount of repositories
            let page = 2;
            const { data } = await api.get(`orgs/takenet/repos?sort=created&direction=asc&page=${page}`)
            page++;
            data.forEach(item => {
                if (item.language === "C#")
                    filteredArray.push(item)
            });
        }
        const oldestRepos = filteredArray.slice(0, selectedRepos); // Select the N oldest C# language repos
        const allRepoData = { //Create a structured object to send to external applications
            avatarUrl: oldestRepos[0].owner.avatar_url,
            repositories: []
        };
        oldestRepos.forEach(repo => {
            allRepoData.repositories.push({
                repoFullName: repo.full_name,
                repoDesc: repo.description,
            });
        })
        const objSuccess = {
            "result": allRepoData
        }
        res.status(200).send(objSuccess)
    }
    catch (err) {
        const objError = {
            "title": err.response.statusText,
            "detail": err.response.data.message,
            "status": err.response.status
        }
        res.status(err.response.status).send(objError)
    }
});

app.use((req, res, next) => {
    const objError = {
        "title": "Not found",
        "detail": "Resource not found in API",
        "status": 404
    }
    res.status(404).send(objError)
})
