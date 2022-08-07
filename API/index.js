const api = require("./api")
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//const arrDir = ["SharpSpin", "async-samples", "blip-client-testing-csharp", "telegram.bot"];

app.listen(port, () => {
    console.log("Server is running");
});

app.get("/getReposInfo", async (req, res) => {
    try {
        let { data } = await api.get("orgs/takenet/repos?sort=created&direction=asc") //Get all repos sorted by 'create date'
            .catch((err) => {
                throw err
            });
        const filteredArray = data.filter(repo => {
           return repo.language === "C#"
        }).slice(0, 5); // Filter the 5 oldest c# language repos
        console.log(filteredArray)
        const allRepoData = {
            avatarUrl: filteredArray[0].owner.avatar_url,
            repoArr: []
        };
        
        filteredArray.forEach(repo => {
            allRepoData.repoArr.push({
                repoFullName: repo.full_name,
                repoDesc: repo.description,
            });
        }) //Create a structured object to send to external applications
        
        res.send(allRepoData)
    }
    catch (err) {
        res.send(err.response.data)
    }
});
