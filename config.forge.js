const fs = require('fs');

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
                const artifactPath = result.artifacts[0];
                console.log(`Artifact for ${result.arch}/${result.platform} packaged to: ${artifactPath}`);
                const pathParts = artifactPath.split(".");
                const extension = pathParts[pathParts.length - 1];
                const newPath = `out/github-pr-tool-${result.arch}-${result.platform}.${extension}`;
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
