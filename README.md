# TaskManager
Task Manager is a web-based app that allows a user to create online lists of tasks. The user can edit and delete these list, as well as share the lists with other users and also collaborate with other users on a single list. The app can also remind the user of the tasks on the list to complete, and set a time and date deadline that user wants to finish a task by.
|
||
|||
||||
|||||
||||||
|||||||
||||||
|||||
||||
|||
||
|

**YOU SHOULD NEVER TOUCH (PUSH OR PULL) WITHOUT THE WHOLE TEAM BEING INVOLVED!!**

**I need to make a new branch:**

```
  git branch [YOUR BRANCH]          // Create a new branch  
  git checkout [YOUR BRANCH]        // Switch to your new branch  
```
  

**I finished / tested / verified a feature and want to add it to the current sprint branch:**

```
  git checkout [SprintX]            // Switch to target build branch  
  git pull origin [SprintX]         // Pull latest build  
  git merge [YOUR_BRANCH_NAME]      // Fold your new awesome working feature into build branch   
```
  
  
**Someone pushed a new feature to the current sprint branch and I wanna fold it into my current development branch:**

```
  git checkout [SprintX]            // Switch to target build branch  
  git pull origin [SprintX]         // Pull latest build  
  git checkout [YOUR BRANCH]        // Switch to your branch  
  git merge [SprintX]               // Fold new build into your branch  
```
  
  
**I want to push my changes up to my branch:**

```
  git checkout [YOUR BRANCH]                                  // Switch to your branch
  git commit -m " << List the changes you made here >>"       // Create a commit with a message
  git push origin [YOUR BRANCH]                               // Push your latest update to your branch
```
  
  
**I want to remove my local changes to a file:**

```
 git checkout -- [FILE NAME]        // Reverts your local changes on a file to the most recent  
```


