const fs = require('fs');
const path = require('path');

module.exports = {
    packagerConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "github_pr_tool"
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        },
        {
            name: "@electron-forge/maker-deb",
            config: {}
        },
    ],
    hooks: {
        postMake: async (config, results) => {
            results.forEach(result => {
                let artifactPath = result.artifacts[0];


                // list all files in the directory
                fs.readdir(artifactPath, (err, files) => {
                    if (err) {
                        throw err;
                    }

                    console.log("Now listing contents of artifact path");
                    // files object contains all files names
                    // log them on console
                    files.forEach(file => {
                        console.log(file);
                    });
                });

                console.log(`Artifact for ${result.arch}/${result.platform} packaged to: ${artifactPath}`);
                if (artifactPath.includes("squirrel.windows")) {
                    artifactPath = artifactPath + path.sep + "github-pr-tool.exe";
                }
                const pathParts = artifactPath.split(".");
                const extension = pathParts[pathParts.length - 1];
                const newPath = `out${path.sep}github-pr-tool-${result.arch}-${result.platform}.${extension}`;
                fs.copyFile(result.artifacts[0], newPath, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`Successfully wrote to: ${newPath}`);
                })
            })
        }
    }
}
