var ORGANIZATION = "";
var TEAM = "";
var PERSONAL_ACCESS_TOKEN = "";

function getGraphQLQuery() {
  return `
    query {
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
      organization (login: "${ORGANIZATION}") {
        name
        team (slug: "${TEAM}") {
          name
          repositories (first: 100 <AFTER>) {
            edges {
              node {
                name
                pullRequests (first: 100 states: [OPEN]) {
                  edges {
                    node {
                      title
                      url
                      author {
                        login
                      }
                      createdAt
                      reviewDecision
                    }
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;
}

var formatString = str => str ? str[0].toUpperCase() + str.slice(1, str.length).toLowerCase().replace("_", " ") : "";
var formatDate = d => d.getFullYear()
    + '-'
    + ('0' + (d.getMonth() + 1)).slice(-2)
    + '-'
    + ('0' + d.getDate()).slice(-2)
    + " "
    + ('0' + d.getHours()).slice(-2)
    + ":"
    + ('0' + d.getMinutes()).slice(-2);

function makeRequest(endCursor) {
    var query = getGraphQLQuery();

    var graphql_query = endCursor ?
        query.replace('<AFTER>', `after: "${endCursor}"`) :
        query.replace('<AFTER>', '');

    $.ajax({
        url: 'https://api.github.com/graphql',
        type: "POST",
        data: JSON.stringify({ query: graphql_query }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "bearer " + PERSONAL_ACCESS_TOKEN)
            xhr.setRequestHeader("Content-Type", "application/json")
        }, success: function (responseData) {
            document.getElementById('message').innerText = '';
            if (responseData.errors) {
                var errors = responseData.errors;
                $('#table').hide();
                $('#message').append("<p> <b>Errors in GraphQL query:</b>");
                for (var i = 0; i < errors.length; i++) {
                    $('#message').append("<p>" + errors[i].message);
                }
                return;
            }

            var repositoriesData = responseData.data.organization.team.repositories
            var repos = repositoriesData.edges;
            var tr;
            for (var i = 0; i < repos.length; i++) {
                var repo = repos[i].node;
                var pullRequests = repo.pullRequests.edges;
                for (var j = 0; j < pullRequests.length; j++) {
                    var pr = pullRequests[j].node;

                    tr = $('<tr/>');
                    tr.append("<td>" + repo.name + "</td>");
                    tr.append("<td>" + "<a href=" + pr.url + ">" + pr.title + "</a>" + "</td>");
                    tr.append("<td>" + pr.author.login + "</td>");
                    tr.append("<td>" + formatDate(new Date(pr.createdAt)) + "</td>");
                    tr.append("<td>" + formatString(pr.reviewDecision) + "</td>");
                    $('#table').append(tr);
                }
            }

            if (repositoriesData.pageInfo.hasNextPage) {
                document.getElementById('message').innerText = 'Still loading more results...';
                makeRequest(repositoriesData.pageInfo.endCursor);
            }
        },
        error: function (response) {
            document.getElementById('message').innerText = "Request returned response code " + response.status + ": " + response.statusText;
            $('#table').hide();
        }
    });
}

$(document).ready(function () {
    PERSONAL_ACCESS_TOKEN = localStorage.getItem("PERSONAL_ACCESS_TOKEN");
    ORGANIZATION = localStorage.getItem("ORGANIZATION");
    TEAM = localStorage.getItem("TEAM");

    if (!PERSONAL_ACCESS_TOKEN || !ORGANIZATION || !TEAM) {
      window.location.href = "settings.html";
    }

    makeRequest();
});
