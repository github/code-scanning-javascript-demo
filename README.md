# Code Scanning JavaScript Tutorial

Welcome to the Code Scanning JavaScript Tutorial! This tutorial will take you through how to set up GitHub Advanced Security: Code Scanning as well as interpret results that it may find. The following repository contains vulnerability [CVE-2018-20835](https://github.com/advisories/GHSA-x2mc-8fgj-3wmr) (aka Zip Slip).

## Introduction

Code scanning is a feature that you use to analyze the code in a GitHub repository to find security vulnerabilities and coding errors. Any problems identified by the analysis are shown in GitHub.

You can use code scanning with CodeQL, a semantic code analysis engine. CodeQL treats code as data, allowing you to find potential vulnerabilities in your code with greater confidence than traditional static analyzers.

This tutorial with use CodeQL Analysis with Code Scanning in order to search for vulnerabilities within your code. 

## Instructions

<details>
<summary>Fork this repo</summary>
<p> 
  
Begin by [forking this repo](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).
</p>
</details>

<details>
<summary>Enable Code Scanning</summary>
<p> 

#### Security tab

Click on the `Security` tab.


<img src="https://user-images.githubusercontent.com/6920330/96745784-81480380-1394-11eb-886d-55e7c207c9c9.png" width="70%"/>

#### Set up code scanning

Click `Set up code scanning`.

<img src="https://user-images.githubusercontent.com/6920330/96745792-8311c700-1394-11eb-83fd-e47d09bf148e.png" width="70%"/>

#### Setup Workflow

Click the `Setup this workflow` button by CodeQL Analysis.

<img src="https://user-images.githubusercontent.com/6920330/96746928-aee17c80-1395-11eb-9eb2-657dd0e92ed9.png" width="70%"/>

This will create a GitHub Actions Workflow file with CodeQL already set up. Since JavaScript is an interpreted language there is no need to configure any builds. See the [documentation](https://docs.github.com/en/free-pro-team@latest/github/finding-security-vulnerabilities-and-errors-in-your-code/running-codeql-code-scanning-in-your-ci-system) if you would like to configure CodeQL Analysis with a 3rd party CI system instead of using GitHub Actions.
</p>
</details>

<details>
  
<summary>Actions Workflow file</summary>
<p>

#### Actions Workflow

The Actions Workflow file contains a number of different sections including:
1. Checking out the repository
2. Initializing the CodeQL Action
3. Running Autobuilder (not necessary for interpreted languages)
4. Running the CodeQL Analysis

<img src="https://user-images.githubusercontent.com/6920330/96746940-b143d680-1395-11eb-9778-0891525a39c1.png" width="80%"/>

Click `Start Commit` -> `Commit this file` to commit the changes.
</p>
</details>

<details>
<summary>GitHub Actions Progress</summary>

<p>
 
#### GitHub Actions Progress

Click `Actions` tab -> `CodeQL`

Click the specific workflow run. You can view the progress of the Workflow run until the analysis completes.

<img src="https://user-images.githubusercontent.com/6920330/96748337-64f99600-1397-11eb-9ab7-b78ec23466ae.png" width="80%"/>

</p>
</details>

<details>
<summary>Security Issues</summary>
<p>
  
Once the Workflow has completed, click the `Security` tab -> ` Code Scanning Alerts`. An security alert "Arbitrary file write during zip extraction ("Zip Slip")
" should be visible.

#### Security Alert View

Clicking on the security alert will provide details about the security alert including:
A description of the issue
A tag to the CWE that it is connected to as well as the type of alert (Error, Warning, Note)
The line of code that triggered the security alert
The ability to dismiss the alert depending on certain conditions (false positive? won't fix? used in tests?)

<img src="https://user-images.githubusercontent.com/6920330/96749627-0c2afd00-1399-11eb-92f9-3356e387201f.png" width="80%"/>

#### Security Alert Description

Click `Show more` to view a full desciption of the alert including examples and links to additional information.

<img src="https://user-images.githubusercontent.com/6920330/96749626-0c2afd00-1399-11eb-9ef5-9560ca585a1b.png" width="80%"/>

#### Security Full Description

<img width="80%" src="https://user-images.githubusercontent.com/6920330/97208478-8bea0a80-1791-11eb-8a2a-f625649312f0.png">

</p>
</details>

<details>
<summary>Show Paths</summary>
<p>

#### Show Paths Button

CodeQL Analysis is able to trace the dataflow path from source to sink and gives you the ability to view the path traversal within the alert.

Click `show paths` in order to see the dataflow path that resulted in this alert.

<img src="https://user-images.githubusercontent.com/6920330/96749839-514f2f00-1399-11eb-80f7-1b83e5c195e7.png" width="80%"/>

#### Show Paths View

<img src="https://user-images.githubusercontent.com/6920330/96749909-6926b300-1399-11eb-99df-143d17804aeb.png" width="80%"/>

</p>
</details>

<details>
<p>  
  
<summary>Fix the Security Alert</summary>

In order to fix this specific alert, we will need to ensure that the destination file paths is the only location where files can be written to.

Click on the `Code` tab and [Edit](https://docs.github.com/en/free-pro-team@latest/github/managing-files-in-a-repository/editing-files-in-your-repository) the `index.js` file. Navigate to Line 264 of the `index.js` file and modify the line:

`var srcpath = path.resolve(cwd, header.linkname)`

to

`var srcpath = path.join(cwd, path.join('/', header.linkname))`

Click `Create a new branch for this commit and start a pull request`, name the branch `fix-zip-slip`, and create the Pull Request.

#### Pull Request Status Check

In the Pull Request, you will notice that the CodeQL Analysis has started as a status check. Wait until it completes.

<img src="https://user-images.githubusercontent.com/6920330/96752215-2adec300-139c-11eb-9c5e-3a04f24ba0bf.png" width="80%"/>

#### Security Alert Details

After the Workflow has completed click on `Details` by the `Code Scanning Results / CodeQL` status check. 

<img src="https://user-images.githubusercontent.com/6920330/96752487-85781f00-139c-11eb-943d-602f2de98998.png" width="80%"/>

#### Fixed Alert

Notice that Code Scanning has detected that this Pull Request will fix the Zip Slip vulnerability that was detected before.

<img src="https://user-images.githubusercontent.com/6920330/96752486-85781f00-139c-11eb-9a7e-3ccbc81da3d1.png" width="80%"/>

Merge the Pull Request. After the Pull Request has been merged, another Workflow will kick off to scan the repository for any vulnerabilties. 

#### Closed Security Alerts

After the final Workflow has completed, navigate back to the `Security` tab and click `Closed`. Notice that the Zip Slip security alert now shows up as a closed issue.

<img src="https://user-images.githubusercontent.com/6920330/96753441-e0f6dc80-139d-11eb-9a2a-d53075b6331e.png" width="80%"/>

#### Traceability

Click on the security alert and notice that it details when the fix was made, by whom, and the specific commit. This provides full traceability to detail when and how a security alert was fixed and exactly what was changed to remediate the issue.

<img src="https://user-images.githubusercontent.com/6920330/96753440-e05e4600-139d-11eb-81ed-c22e4f41d74a.png" width="80%"/>

</p>
</details>
  
## Next Steps

Ready to talk about advanced security features for GitHub Enterprise? [Contact Sales](https://enterprise.github.com/contact) for more information!

Check out [GitHub's Security feature page](https://github.com/features/security) for more security features embedded into GitHub.

Check out the Code Scanning [documentation](https://docs.github.com/en/free-pro-team@latest/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning) for additional configuration options and technical details.
