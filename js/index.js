document.addEventListener("DOMContentLoaded",()=>{

    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    const inputValue = document.getElementById("search");

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        const itemValue = inputValue.value.trim();
        if (itemValue !== "") {
            searchGitHub(itemValue);
        }
      })

    function searchGitHub(itemValue) {
        const url = `https://api.github.com/search/users?q=${itemValue}`;
        fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayUsers(data.items);
        })
        .catch(function(error) {
            console.error("Error searching GitHub users:", error);
        });
    }

    function displayUsers(users) {
        userList.innerHTML = "";
        users.forEach(function(user) {
            const li = createUserListItem(user);
            li.addEventListener("click", function() {
                getUserRepos(user.login);
            });
            userList.appendChild(li);
        });
    }

    function createUserListItem(user) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = user.login;
        link.href = user.html_url;
        link.target = "_blank";
        li.appendChild(link);
        return li;
    }

    function getUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response=>{response.json();
        })
        .then(repos=> {
            displayRepos(repos);
        })
        .catch(error=>{
            console.error("Error fetching user repos:", error);
        });
    }

    function displayRepos(repos) {
        reposList.innerHTML = "";
        if (repos.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No repository found";
            reposList.appendChild(li);
        } else {
            repos.forEach(function(repo) {
                const li = createRepoItems(repo);
                reposList.appendChild(li);
            });
        }
    }

    function createRepoItems(repo) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = repo.name;
        link.href = repo.html_url;
        link.target = "_blank";
        li.appendChild(link);
        return li;
    }
})