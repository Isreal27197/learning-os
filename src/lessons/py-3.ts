import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
        difficulty: 'beginner',
        prerequisites: ['py-1', 'py-2'],
        learningObjectives: [
          'Explain the difference between a terminal application, a shell and a command prompt, and identify the shell in use.',
          'Use pwd, ls and cd to inspect and navigate directories, with the corresponding PowerShell commands.',
          'Create, inspect, copy, move and safely remove files and directories using paths appropriate to the current shell.',
          'Distinguish relative and absolute paths, recognize common hidden files, and describe a few parts of the Linux filesystem.',
          'Run a Python script from the terminal and inspect a process exit status at a beginner level.',
          'Explain how Git records project history and distinguish Git from GitHub.',
          'Initialize a repository, inspect its status, stage chosen files, create commits and read the commit history.',
          'Use a .gitignore file for generated files and local secrets, and explain why ignored files already tracked by Git need separate handling.',
          'Create and switch branches, merge a simple branch, and recognize a basic merge conflict.',
          'Explain what a remote is and use GitHub-hosted repositories with git push and git pull.',
          'Diagnose common command-not-found, wrong-directory, staging, branch, remote and authentication errors without risking project data or credentials.',
        ],
        keyConcepts: [
          'terminal',
          'shell',
          'command prompt',
          'working directory',
          'relative path',
          'absolute path',
          'hidden file',
          'filesystem root',
          'process',
          'exit status',
          'version control',
          'repository',
          'working tree',
          'staging area',
          'commit',
          '.gitignore',
          'branch',
          'merge',
          'remote',
          'GitHub',
          'push and pull',
        ],
        contentSections: [
          {
            title: '1. Terminal, shell and command prompt',
            content:
              'A terminal is the application window where you type commands and read text output. A shell is the program running inside that window: it interprets the commands, finds programs and passes along their results. “Command prompt” can mean the visible prompt where a shell waits for input, and it is also the name commonly used for the Windows Command Prompt (cmd.exe), which is one particular shell. These terms are related but are not interchangeable.\n\nExamples: Windows Terminal is a terminal application and can host PowerShell or Command Prompt. On macOS, Terminal commonly runs zsh. On Linux, a terminal emulator commonly runs bash or another shell. Commands can differ between shells even when they have similar names. This lesson labels Linux/macOS shell examples and PowerShell alternatives; Git commands are generally the same in either shell.\n\nA terminal does not guarantee that Git or Python is installed. Check before relying on them. If a command is unavailable, install the software using its official instructions or ask an administrator; do not download an untrusted executable. In PowerShell, Python may be available as python or through the Windows launcher py; Linux and macOS commonly use python3.',
            codeExamples: [
              {
                title: 'Check which tools are available',
                language: 'shell',
                code: 'git --version\npython --version\npython3 --version',
                explanation:
                  'Each command asks the shell to run a program that prints its version. Some systems have python but not python3, or the reverse. A “command not found” or “not recognized” message means the command is unavailable by that name, not that the project is broken.',
              },
            ],
          },
          {
            title: '2. Find your location and move between directories',
            content:
              'A directory is a folder. The shell keeps a current working directory: the location from which relative paths are interpreted and where commands usually operate. Check it before creating, moving or removing files. pwd prints the current directory in common Linux/macOS shells; PowerShell provides Get-Location (and the familiar pwd alias). ls lists directory contents; PowerShell uses Get-ChildItem (with ls as an alias). cd changes the current directory; PowerShell uses Set-Location.\n\nA relative path is interpreted from the current working directory, such as projects/cli-practice. An absolute path names a location from the filesystem root, such as /home/ada/projects on Linux or macOS, or C:/Users/Ada/projects in PowerShell. A path containing spaces should be quoted, for example cd "Course Notes".\n\nLinux and macOS commonly treat names that start with a dot, such as .git and .venv, as hidden in ordinary listings; use ls -a to include them. In Windows, hidden status is generally a file attribute, so use Get-ChildItem -Force in PowerShell. The Linux filesystem begins at /. Common locations include /home for user directories, /tmp for temporary files, /etc for system configuration, and /usr for installed system software. Do not edit system locations for this lesson. macOS and Windows have different filesystem layouts; do not assume Linux paths exist there.',
            codeExamples: [
              {
                title: 'Inspect and navigate in Linux or macOS shells',
                language: 'bash',
                code: 'pwd\nls -la\ncd projects\npwd',
                explanation:
                  'The first command reports the current location, ls -la includes hidden entries, and cd projects enters a child directory named projects if it exists. The final pwd confirms where you landed.',
              },
              {
                title: 'The PowerShell equivalents',
                language: 'powershell',
                code: 'Get-Location\nGet-ChildItem -Force\nSet-Location projects\nGet-Location',
                explanation:
                  'These PowerShell commands perform the same basic tasks. PowerShell has aliases such as pwd, ls and cd, but using the full command names makes the shell-specific behavior clearer to a beginner.',
              },
            ],
          },
          {
            title: '3. Create and manage files carefully',
            content:
              'Use mkdir to create a directory, then move into it with cd before working on its contents. touch creates an empty file or updates its timestamp on Linux/macOS. In PowerShell, New-Item -ItemType File creates a file; first check that the path does not already exist so you do not replace existing work. cat displays a file in common shells; PowerShell’s full command name is Get-Content. cp copies, mv moves or renames, and rm removes files on Linux/macOS. In PowerShell, use Copy-Item, Move-Item and Remove-Item.\n\nCommands act on the paths you provide, often relative to the current directory. Before a destructive operation, inspect the current directory with pwd or Get-Location and confirm the exact target with ls or Get-ChildItem. rm is not a recycle-bin command: it can permanently remove the named file. Recursive removal can erase an entire directory tree. PowerShell’s Remove-Item -Recurse is similarly consequential. Do not experiment with deletion on real project data, broad paths, wildcards or system directories. Practice only on a disposable directory whose contents you have checked.',
            codeExamples: [
              {
                title: 'Create and inspect a scratch file on Linux/macOS',
                language: 'bash',
                code: 'mkdir cli-practice\ncd cli-practice\ntouch notes.txt\ncat notes.txt\ncp notes.txt notes-copy.txt\nmv notes-copy.txt archived-notes.txt\nls -la',
                explanation:
                  'This creates a practice folder and an empty file, displays it, copies the file, renames the copy, and lists the results. cat prints nothing for an empty file. No files are removed.',
              },
              {
                title: 'Create and inspect a scratch file in PowerShell',
                language: 'powershell',
                code: 'New-Item -ItemType Directory -Path cli-practice\nSet-Location cli-practice\nif (-not (Test-Path notes.txt)) { New-Item -ItemType File -Path notes.txt }\nGet-Content notes.txt\nCopy-Item notes.txt notes-copy.txt\nMove-Item notes-copy.txt archived-notes.txt\nGet-ChildItem -Force',
                explanation:
                  'Test-Path avoids creating or replacing notes.txt when it already exists. The remaining commands create, inspect, copy, rename and list practice files. Check paths before applying these operations to important data.',
              },
            ],
          },
          {
            title: '4. Run Python programs and understand processes',
            content:
              "A process is a running instance of a program. When you enter a command such as python hello.py, the shell starts Python as a process and normally waits for it to finish before accepting the next command. A long-running program may keep using the terminal until it exits. Ctrl+C requests an interrupt in many terminals; the program may stop, so use it only when you intend to interrupt that run.\n\nMove to the directory containing the script, verify the filename with a directory listing, and run it with the Python command available on your system. For example, use python hello.py on Windows when python is configured, or py hello.py with the Windows launcher; use python3 hello.py on many Linux/macOS systems. The Python version check from the first section helps you choose. A process finishes with an exit status: zero conventionally means success, while a nonzero value signals that the command reported a problem. The exact value is chosen by the program.\n\nOn Linux/macOS, echo $? prints the immediately preceding command's status. In PowerShell, $LASTEXITCODE reports the last native program's exit code; $? is only a success/failure boolean for the preceding command. In Command Prompt, %ERRORLEVEL% reports the previous program's status. Check it before running another command that might change it.",
            codeExamples: [
              {
                title: 'Run a tiny script and check its result',
                language: 'python',
                code: 'print("Hello from the terminal")',
                explanation:
                  'Save this as hello.py, then run python hello.py (or py hello.py in PowerShell, or python3 hello.py on many Linux/macOS systems). It prints one line and normally exits with status zero. If Python cannot be found, check its installation and command name rather than changing the script.',
              },
              {
                title: 'Read an exit status immediately',
                language: 'bash',
                code: 'python3 hello.py\necho $?',
                explanation:
                  'The first command runs the program. The second prints its exit status: zero conventionally indicates success. In PowerShell, inspect $LASTEXITCODE after the Python command; in Command Prompt, inspect %ERRORLEVEL%.',
              },
            ],
          },
          {
            title: '5. Git records project history',
            content:
              'Git is a version-control system. It records snapshots of selected project files so you can understand what changed, when it changed, and return to an earlier committed state. A Git repository is a project directory with Git history and settings stored in a hidden .git directory. Git is useful even for a solo project: small, named commits make experiments and debugging easier.\n\nGitHub is a hosting and collaboration platform for Git repositories; it is not Git itself. You can use Git locally without a GitHub account or network connection. To check for Git, run git --version. If Git is not installed, follow the official installation instructions for your operating system before continuing.\n\nBefore the first commit, Git may ask for an author name and email. Configure these deliberately with git config; this is commit attribution, not an authentication password. Do not put an access token or password in Git configuration, a file in the project, a command that might be saved in shell history, or a commit.',
            codeExamples: [
              {
                title: 'Set commit attribution and create a local repository',
                language: 'shell',
                code: 'git config --global user.name "Ada Lovelace"\ngit config --global user.email "ada@example.com"\nmkdir study-tools\ncd study-tools\ngit init',
                explanation:
                  'Replace the sample name and email with the attribution you want on your commits. These values identify authorship; they are not passwords. git init creates local repository metadata in .git. It does not upload files or create a GitHub repository.',
              },
            ],
          },
          {
            title: '6. Check, stage and commit a change',
            content:
              'Git separates your working tree (the files you are editing) from the staging area (the exact changes selected for the next snapshot). git status summarizes both. git add README.md stages that file; git add . stages all eligible changes under the current directory, so inspect status before using it. git commit -m "Add project overview" records the staged snapshot with a short message. A commit includes only staged changes, not every unsaved or unstaged idea.\n\nA useful beginner cycle is: edit a small coherent change, run git status, stage the intended files, run git status again to review the staged list, then commit with a message describing the change. Use git log --oneline to inspect recent commits. If Git reports that there is nothing to commit, check whether you changed and saved a file, whether it is ignored, and whether you staged it.',
            codeExamples: [
              {
                title: 'Make and inspect a first commit',
                language: 'shell',
                code: 'git status\nprintf "# Study tools\\n" > README.md\ngit status\ngit add README.md\ngit status\ngit commit -m "Add project overview"\ngit log --oneline',
                explanation:
                  'This uses printf to create a short README in Linux/macOS shells. In PowerShell, create it with Set-Content README.md "# Study tools". The status checks make the change visible before and after staging; the commit records the staged file, and log displays the new history.',
              },
            ],
          },
          {
            title: '7. Ignore generated files and keep secrets out of Git',
            content:
              "A .gitignore file lists paths Git should normally leave untracked. Python projects commonly ignore virtual environments, bytecode caches and local environment-variable files. For example, .venv/ is a local environment directory, __pycache__/ and *.py[cod] are generated Python bytecode, and .env often contains local configuration. Track the .gitignore itself so collaborators receive the same ignore rules. A safe .env.example may document required variable names with clearly fake placeholder values; never commit real passwords, API keys, access tokens, private keys or other credentials.\n\nExample patterns are relative to the repository and can match in subdirectories. Ignoring is not the same as deleting. If a file was already committed, adding it to .gitignore does not remove it from repository history or stop tracking it. If a real credential was committed or pushed, treat it as exposed: revoke or rotate it using the provider's instructions, then follow an appropriate history-removal process if necessary. Simply deleting the visible file is not enough to make a leaked secret safe.",
            codeExamples: [
              {
                title: 'A beginner Python .gitignore',
                language: 'gitignore',
                code: '.venv/\n__pycache__/\n*.py[cod]\n.env',
                explanation:
                  'These rules omit a project-local virtual environment, Python cache directories and bytecode files, and a local .env file. Add the rules before staging generated or private files, then check git status. Never test secret handling with a real credential.',
              },
            ],
          },
          {
            title: '8. Branches let you work on an isolated change',
            content:
              'A branch is a named line of development. It lets you make a change separately from the branch you use as the main project line. git branch lists local branches. git switch branch-name moves to an existing branch; git switch -c branch-name creates and switches to a new one. Commits made on that branch belong to its history until you merge them into another branch.\n\nTo merge a simple finished change, switch to the branch that should receive it (often main), then run git merge feature-name. Git combines the histories. If both branches changed the same lines in incompatible ways, Git pauses with a merge conflict. Read the marked file, decide what the final content should be, remove conflict markers, test the result, stage the resolved file and complete the merge commit if Git requests it. Do not blindly choose a side without understanding which work would be discarded.',
            codeExamples: [
              {
                title: 'Make and merge a small branch',
                language: 'shell',
                code: 'git switch -c add-notes\nprintf "Practice one small change at a time.\\n" > NOTES.txt\ngit add NOTES.txt\ngit commit -m "Add practice note"\ngit switch main\ngit merge add-notes\ngit log --oneline',
                explanation:
                  'The example creates a branch, commits a new file, switches back to main and merges the branch. Run it in a scratch repository with a main branch. If the branch is named master instead, use that existing name or rename it intentionally; do not assume every repository uses main.',
              },
            ],
          },
          {
            title: '9. Remotes connect Git to GitHub',
            content:
              'A remote is a named address for another copy of a Git repository, usually hosted on a service such as GitHub. Create an empty repository on GitHub (without initializing another README if you already have local commits), copy its repository URL from GitHub, and add it as origin with git remote add origin URL. git remote -v displays configured addresses. The URL is not a password; do not embed credentials in it.\n\nAfter a local commit, git push -u origin main sends commits from your local main branch to the remote and records an upstream relationship for later pushes. Use the actual branch name if it is not main. git pull origin main retrieves and integrates changes from the remote main branch into the current branch; review the target branch and working tree before pulling. Authentication is handled through the approved Git credential flow for your setup. Never paste passwords or tokens into lesson notes, source files, command history, or a repository.',
            codeExamples: [
              {
                title: 'Connect an existing local repository',
                language: 'shell',
                code: 'git remote add origin https://github.com/USERNAME/REPOSITORY.git\ngit remote -v\ngit push -u origin main\ngit pull origin main',
                explanation:
                  'Replace the URL with the repository URL copied from your own GitHub repository and confirm the branch name. The first push publishes the local commits; a later pull integrates remote commits. The remote should be the intended repository, and the URL must not contain a token or password.',
              },
            ],
          },
          {
            title: '10. Troubleshoot with evidence',
            content:
              'When a command fails, pause and read the complete message rather than repeating it with more flags. Check the current directory, exact spelling, capitalization, quoting and whether the required tool is installed. “No such file or directory” often means the path is wrong or you are in a different directory. “Permission denied” means the current account cannot perform that operation; do not reach for administrator privileges without understanding why.\n\nFor Git, use git status first. “Not a git repository” usually means you are outside the repository or have not initialized one. “Nothing to commit” can mean the edit was not saved, no change exists, or the file is ignored. A push that says there is no upstream needs the correct remote and branch association; a rejected push may mean the remote contains changes you do not have. Inspect the repository and ask for help before force-pushing or deleting files. A conflict is a request to reconcile edits, not a reason to erase the repository.',
          },
        ],
        workedExamples: [
          {
            title: 'Example 1: Identify the shell and current directory',
            problem:
              'You open Windows Terminal and see a PowerShell prompt. You need to know where a relative file path will point.',
            reasoning:
              'The terminal is the window; PowerShell is the shell. Ask the shell for its current location before using relative paths, and list files including hidden entries.',
            solution: 'Get-Location\nGet-ChildItem -Force',
            explanation:
              'Get-Location reports the working directory. Get-ChildItem -Force displays entries that ordinary listings may hide. On Linux/macOS, the corresponding commands are pwd and ls -la.',
          },
          {
            title: 'Example 2: Safely copy and rename a practice file',
            problem:
              'Create a copy of a notes file and rename the copy without altering the original.',
            reasoning:
              'First verify the directory and source file. Copy before renaming so the original remains in place. Inspect the result.',
            solution:
              'pwd\nls -l notes.txt\ncp notes.txt notes-copy.txt\nmv notes-copy.txt notes-archive.txt\nls -l notes.txt notes-archive.txt',
            explanation:
              'The original notes.txt remains; the copy ends up named notes-archive.txt. In PowerShell, use Get-Location, Get-Item, Copy-Item and Move-Item. This example intentionally avoids rm.',
          },
          {
            title: 'Example 3: Run a Python script from its folder',
            problem:
              'A script named report.py is in a project directory, and the shell says it cannot find the file.',
            reasoning:
              'A relative filename is resolved from the current working directory, not automatically from the script editor. Check location and contents, then move to the project folder or provide the correct path.',
            solution: 'pwd\nls\ncd projects/reporting\nls\npython3 report.py',
            explanation:
              'The listing verifies whether report.py is in the current folder. After changing to the folder containing it, run the program. On Windows, try python report.py or py report.py as appropriate. Do not assume the script is broken until its path and Python command are checked.',
          },
          {
            title: 'Example 4: Make a small, reviewable commit',
            problem: 'You edited README.md and want to save that change in local Git history.',
            reasoning:
              'Use status to inspect the working tree, stage only the intended file, check status again, and commit with a message that explains the change.',
            solution:
              'git status\ngit add README.md\ngit status\ngit commit -m "Explain project setup"\ngit log --oneline',
            explanation:
              'The staging area defines what enters the commit. The final log line helps confirm that the commit is now part of the local history.',
          },
          {
            title: 'Example 5: Keep local environment files out of commits',
            problem:
              'A Python project creates a .venv directory and uses a local .env configuration file.',
            reasoning:
              'Ignore generated environments and local configuration before staging. Check Git status to see whether Git still lists anything that should remain private.',
            solution: '.venv/\n__pycache__/\n*.py[cod]\n.env',
            explanation:
              'Save these lines in the repository’s .gitignore file and commit that file. Do not put real secrets in .env.example. If .env was already tracked or a credential was committed, ignore rules alone do not repair the exposure.',
          },
          {
            title: 'Example 6: Commit a branch and merge it into main',
            problem:
              'Add a small independent documentation file without making the change directly on main.',
            reasoning:
              'Create a branch, make and commit the isolated change, return to main, then merge the branch and inspect history.',
            solution:
              'git switch -c add-setup-note\ngit add SETUP.md\ngit commit -m "Add setup note"\ngit switch main\ngit merge add-setup-note\ngit log --oneline',
            explanation:
              'The branch provides a separate name for the work until it is merged. This simple case adds a new file, so it should not conflict with unchanged files. Repositories can use a different main-branch name.',
          },
        ],
        commonMistakes: [
          {
            title: 'Confusing the terminal with the shell',
            explanation:
              'The terminal is the application window; a shell such as PowerShell, bash or zsh interprets commands inside it. If a command example fails, first check which shell is running and use that shell’s equivalent.',
          },
          {
            title: 'Using a relative path from the wrong directory',
            explanation:
              'Relative paths start from the current working directory. Use pwd or Get-Location, list files, then cd to the expected directory or enter a correctly quoted path.',
            incorrectCode: 'python report.py',
            correctedCode: 'pwd\nls\ncd projects/reporting\npython3 report.py',
          },
          {
            title: 'Treating rm as a safe undo command',
            explanation:
              'rm can permanently remove files, and recursive deletion can remove many files at once. There is no universal undo. Check your location and the exact target first, practice only on disposable data, and do not use broad wildcards or elevated privileges to “make it work.”',
            incorrectCode: 'rm -rf *',
          },
          {
            title: 'Expecting git add to create a commit',
            explanation:
              'git add stages selected changes; git commit records the staged snapshot. Check status between the two so you know exactly what will be committed.',
            incorrectCode: 'git add README.md',
            correctedCode:
              'git status\ngit add README.md\ngit status\ngit commit -m "Describe the change"',
          },
          {
            title: 'Expecting .gitignore to untrack an existing file',
            explanation:
              'Ignore rules apply to untracked files. A file already committed remains tracked even after its name is added to .gitignore. Do not assume a committed credential is safe; revoke or rotate it promptly and follow an appropriate cleanup process.',
          },
          {
            title: 'Committing secrets or authentication tokens',
            explanation:
              'Never commit passwords, API keys, access tokens, private keys or real credential files. Use the provider’s secure credential mechanism, keep local secrets outside version control, and review staged files with git status before each commit. If a secret is exposed, rotate or revoke it even if the file is later removed.',
          },
          {
            title: 'Assuming every system uses the same commands and paths',
            explanation:
              'Linux/macOS shells and PowerShell have overlapping command names but different behavior and path conventions. In particular, Unix dotfiles and Windows hidden attributes differ. Use the lesson’s labeled alternatives and inspect help for the shell you are using.',
          },
          {
            title: 'Pushing to the wrong branch or remote',
            explanation:
              'Before pushing, inspect git status, git branch --show-current and git remote -v. Confirm the remote address and branch. Never force-push or paste a token into a remote URL just to get past an error.',
          },
        ],
        resources: [
          {
            id: 'py-3-resource-git-book',
            title: 'Pro Git: About Version Control',
            url: 'https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control',
            type: 'book',
            explanation:
              'An official, freely available book introducing version control and the role Git plays.',
          },
          {
            id: 'py-3-resource-git-reference',
            title: 'Git command reference',
            url: 'https://git-scm.com/docs',
            type: 'documentation',
            explanation:
              'Official reference pages for commands such as status, add, commit, branch, switch, merge, push and pull.',
          },
          {
            id: 'py-3-resource-github-git',
            title: 'GitHub Docs: About Git and GitHub',
            url: 'https://docs.github.com/en/get-started/start-your-journey/about-github-and-git',
            type: 'documentation',
            explanation:
              'Explains the difference between Git version control and GitHub as a collaboration and hosting platform.',
          },
          {
            id: 'py-3-resource-github-ignore',
            title: 'GitHub Docs: Ignoring files',
            url: 'https://docs.github.com/en/get-started/git-basics/ignoring-files',
            type: 'documentation',
            explanation:
              'Official guidance on .gitignore patterns and files that should not be tracked.',
          },
          {
            id: 'py-3-resource-powershell',
            title: 'Microsoft Learn: Get started with PowerShell',
            url: 'https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/01-getting-started?view=powershell-7.5',
            type: 'documentation',
            explanation:
              'An introductory, official guide to PowerShell commands and shell concepts.',
          },
          {
            id: 'py-3-resource-python-cli',
            title: 'Python documentation: Using Python on the command line',
            url: 'https://docs.python.org/3/using/cmdline.html',
            type: 'documentation',
            explanation:
              'Official reference for invoking the Python interpreter and running scripts.',
          },
          {
            id: 'py-3-resource-ubuntu-cli',
            title: 'Ubuntu: The Linux command line for beginners',
            url: 'https://ubuntu.com/tutorials/command-line-for-beginners',
            type: 'course',
            explanation: 'A beginner-oriented introduction to using a Linux command line.',
          },
        ],
        exercises: [
          {
            id: 'py-3-exercise-shell-orientation',
            title: '1. Identify your terminal and shell',
            instructions:
              'Open the terminal you intend to use for Python work. Identify the terminal application and shell shown in the prompt or application settings. Run the version checks for Git and Python from this lesson. If one command is unavailable, record the exact message and consult the official installation instructions before installing anything.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'You can name the terminal application and the shell it is running.',
              'You know whether Git and a Python command are available.',
            ],
            acceptanceCriteria: [
              'Distinguish the terminal window from the shell interpreting commands.',
              'Record the exact Python command that works, if installed.',
              'Do not install software from an unofficial download source.',
            ],
            constraints: [
              'Do not paste personal system details or credentials into a public repository.',
            ],
          },
          {
            id: 'py-3-exercise-navigate',
            title: '2. Navigate a practice directory',
            instructions:
              'In a safe location such as your user directory, create a directory named cli-practice, enter it, and confirm your new working directory. List ordinary and hidden entries using the appropriate command for your shell. Return to the parent directory and enter the practice folder again using a relative path. Hint: compare pwd/Get-Location before and after cd/Set-Location.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The working directory ends at cli-practice.',
              'You can explain how the relative path was resolved.',
            ],
            acceptanceCriteria: [
              'Create the practice directory without changing existing files.',
              'Show the current location and list hidden entries.',
              'Navigate into and out of the directory successfully.',
            ],
          },
          {
            id: 'py-3-exercise-files',
            title: '3. Create, view, copy and rename files',
            instructions:
              'Inside cli-practice, create a small text file with a few non-sensitive lines using a text editor. Display it with cat or Get-Content, copy it, rename the copy, and list both files. Then, only if you are certain you are still inside this disposable practice folder and have checked the exact filename, remove the renamed copy with rm or Remove-Item. Do not use a wildcard or recursive deletion.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The original text file remains unchanged.',
              'The renamed copy is removed only after its location and exact name are verified.',
            ],
            acceptanceCriteria: [
              'Use a shell-appropriate create/copy/rename/display command.',
              'Confirm the original remains before removing the practice copy.',
              'Explain why rm and Remove-Item should be used cautiously.',
            ],
            constraints: ['Use only disposable test files; do not use real or valuable data.'],
          },
          {
            id: 'py-3-exercise-paths',
            title: '4. Compare relative and absolute paths',
            instructions:
              'From cli-practice, write down the relative path to your text file and inspect the absolute current directory. Change to a different directory and try to display the file using the old relative path; explain why that attempt behaves differently. Then use an absolute path or return to the correct directory and display the file. Quote any path that contains spaces.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The file can be located from both the practice directory and another location.',
              'You can explain which part of the path changes with the working directory.',
            ],
            acceptanceCriteria: [
              'Identify one relative path and one absolute path.',
              'Use pwd/Get-Location to establish the base of a relative path.',
              'Do not move or delete the file during the test.',
            ],
          },
          {
            id: 'py-3-exercise-run-python',
            title: '5. Run a Python script from the terminal',
            instructions:
              'Create hello.py in cli-practice with a short print statement. Use the Python command that worked on your system to run it from the terminal. Check the output and, immediately afterward, inspect the exit status using the syntax for your shell. Try running a deliberately misspelled filename and diagnose the message without renaming or deleting files blindly.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The script prints the expected line and finishes successfully.',
              'The missing-file attempt produces a useful path-based diagnosis.',
            ],
            acceptanceCriteria: [
              'Run the saved script from its containing directory.',
              'Check the exit status before another command changes it.',
              'Explain the difference between a missing script path and a Python syntax error.',
            ],
          },
          {
            id: 'py-3-exercise-first-commit',
            title: '6. Initialize Git and make a first commit',
            instructions:
              'Create a separate directory named git-practice and initialize a repository in it. Create a README.md with a short project description. Inspect status, stage only README.md, inspect status again, commit with a meaningful message, and inspect the one-line history. If Git asks for author attribution, configure a name and email you intend to use; never enter a password or access token.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The local repository contains a commit for README.md.',
              'The working tree is clean after the commit.',
            ],
            acceptanceCriteria: [
              'Run git init in the intended practice directory.',
              'Use git status before and after staging.',
              'Create one commit and verify it with git log --oneline.',
            ],
            constraints: [
              'Keep this repository local; no GitHub account is required for this exercise.',
            ],
          },
          {
            id: 'py-3-exercise-ignore',
            title: '7. Add and verify a .gitignore',
            instructions:
              'In git-practice, create a .gitignore containing .venv/, __pycache__/, *.py[cod] and .env. Create only empty, disposable test paths such as __pycache__/sample.pyc and a fake .env containing no credentials. Check git status and confirm these test paths are not offered as ordinary untracked files, while .gitignore itself can be staged. Remove only the fake test files using carefully checked exact paths, or leave them inside the disposable repository.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Git ignores the generated and local configuration test paths.',
              '.gitignore remains a file that can be committed.',
            ],
            acceptanceCriteria: [
              'Explain what each ignore pattern is intended to exclude.',
              'Verify results with git status.',
              'Do not create or use a real secret, even temporarily.',
            ],
            constraints: [
              'Do not use a real .env file or any credential.',
              'Ignore rules do not untrack files that were already committed.',
            ],
          },
          {
            id: 'py-3-exercise-branch',
            title: '8. Create, switch and merge a branch',
            instructions:
              'In the clean git-practice repository, check the current branch name. Create a branch named add-notes, add a new small NOTES.md file, and commit it on that branch. Switch back to the repository’s original main branch (it may be called master) and merge add-notes. Inspect the history and status. Because the change adds a new file, it should merge without conflicting edits.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The NOTES.md change appears in the main branch after merging.',
              'The repository history contains the branch commit.',
            ],
            acceptanceCriteria: [
              'Create and switch to a branch with git switch -c.',
              'Commit a change on the branch.',
              'Switch to the receiving branch, merge, and verify status and log.',
            ],
          },
          {
            id: 'py-3-exercise-remote',
            title: '9. Connect a repository to GitHub (optional account)',
            instructions:
              'If you have a GitHub account and are permitted to publish this practice project, create an empty GitHub repository without a generated README, copy its HTTPS or SSH URL, and connect it as origin. Verify it with git remote -v, then push the correct branch. If you do not have an account or do not want to publish, explain in your own words what git remote add, git push and git pull would do without running them. Never put a password or token in the URL or repository.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'You understand the role of a remote and the direction of push and pull.',
              'If performed, the intended local branch is published to the intended GitHub repository.',
            ],
            acceptanceCriteria: [
              'Confirm the remote address and branch before publishing.',
              'Use an approved credential flow if authentication is required.',
              'Never include credentials in a remote URL, note, source file or commit.',
            ],
          },
          {
            id: 'py-3-exercise-troubleshooting',
            title: '10. Diagnose common command and Git errors',
            instructions:
              'For each scenario, write down the first safe check you would make and the likely cause: (a) python reports that it cannot find a file, (b) git says “not a git repository”, (c) git commit says there is nothing to commit, and (d) git push is rejected because the remote has changes. Do not run destructive fixes or force-push. Use the lesson examples and official references to explain each diagnosis.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each failure is paired with an evidence-based check rather than a guessed destructive command.',
              'You can distinguish a local path problem from Git state or remote synchronization.',
            ],
            acceptanceCriteria: [
              'Check location and filenames for the Python path issue.',
              'Check location and repository status for Git issues.',
              'Check the staging area and saved edits for nothing-to-commit.',
              'Inspect branch and remote state before resolving a rejected push.',
            ],
            constraints: ['Do not force-push, delete repository metadata, or expose credentials.'],
          },
        ],
        assessmentQuestions: [
          {
            id: 'py-3-check-shell',
            prompt:
              'Explain the difference between a terminal application and a shell. Give one example of a terminal application and one shell.',
            expectedAnswer:
              'The terminal is the application window for text input/output; the shell interprets commands inside it. For example, Windows Terminal can host PowerShell, or macOS Terminal can host zsh.',
            explanation:
              'Knowing which shell is active helps select commands and syntax that actually apply.',
          },
          {
            id: 'py-3-check-path',
            prompt:
              'If the current directory is /home/ada and you run cat notes/today.txt, what does the path identify? How could changing the current directory affect the command?',
            expectedAnswer:
              'It identifies notes/today.txt relative to /home/ada, so the resulting path is /home/ada/notes/today.txt. From a different current directory, the same relative path may identify another file or no file at all.',
            explanation:
              'A relative path is based on the process current working directory; an absolute path starts at the filesystem root.',
          },
          {
            id: 'py-3-check-delete',
            prompt:
              'Why should you check your current location and the exact target before using rm? Name one safer practice for a beginner.',
            expectedAnswer:
              'rm can permanently remove the named file and recursive forms can erase many files. Check pwd and list the exact disposable target first; practice only in a scratch directory and avoid wildcards or recursive deletion.',
            explanation:
              'Destructive commands should be intentional and limited to a verified target. They are not a substitute for backups.',
          },
          {
            id: 'py-3-check-process',
            prompt:
              'What does an exit status of zero conventionally mean? How do you inspect the last native program exit code in PowerShell?',
            expectedAnswer:
              'Zero conventionally indicates success. In PowerShell, inspect $LASTEXITCODE after the native program; $? is a boolean success indicator, not the numeric exit code.',
            explanation:
              'Exit statuses allow programs and scripts to report success or failure to the shell.',
          },
          {
            id: 'py-3-check-git',
            prompt:
              'Describe the difference between the working tree, staging area and a commit. Which command records the staged snapshot?',
            expectedAnswer:
              'The working tree contains current files, the staging area selects changes for the next snapshot, and a commit records that staged snapshot in repository history. git commit records it.',
            explanation:
              'The staging step lets you choose which changes belong together in a commit.',
          },
          {
            id: 'py-3-check-ignore',
            prompt:
              'Does adding a file to .gitignore remove it from Git if it was already committed? What should you do if a real API key was pushed?',
            expectedAnswer:
              'No. Ignore rules do not stop tracking an already committed file. If a real key was pushed, revoke or rotate it immediately using the provider’s process; then follow an appropriate repository-history cleanup process.',
            explanation:
              'Deleting a secret from the latest version does not make an exposed credential safe, because it may remain in history or copies.',
          },
          {
            id: 'py-3-check-branch',
            prompt:
              'What does git switch -c experiment do? Which branch should be checked out before merging experiment into main?',
            expectedAnswer:
              'It creates a branch named experiment and switches to it. To merge that work into main, switch to main first and run git merge experiment.',
            explanation:
              'A merge integrates the named branch into the currently checked-out branch.',
          },
          {
            id: 'py-3-check-github',
            prompt:
              'What is the difference between Git and GitHub? At a high level, what do push and pull do?',
            expectedAnswer:
              'Git is a version-control tool that records repository history. GitHub hosts Git repositories and adds collaboration features. Push sends local commits to a remote; pull retrieves and integrates remote changes into the current branch.',
            explanation:
              'A local Git repository works without GitHub; GitHub is one service that can host a remote copy.',
          },
          {
            id: 'py-3-check-troubleshoot',
            prompt:
              'Git says “not a git repository.” Name two safe checks to make before running another command.',
            expectedAnswer:
              'Check the current directory with pwd/Get-Location and list its contents. Confirm you are in the intended repository and that it contains the .git metadata; do not initialize a new repository or delete files until you know where you are.',
            explanation:
              'The message often indicates a location problem, so inspect the shell’s location before changing repository state.',
          },
        ],
        miniBuild: {
          title: 'Build a Tracked Python Study Utility',
          goal: 'Create a small, local Python project directory, run a simple script, and use Git to record a clean, reviewable history. The goal is to practise the command-line and version-control workflow, not to build a large application or publish secrets.',
          requirements: [
            'Create a project directory named study-utility and confirm its location before working in it.',
            'Add a small Python script that prints a useful study reminder or lists a few hard-coded study tasks; use only Python concepts already introduced.',
            'Add a README.md that explains the project purpose and how to run the script from the project directory.',
            'Add a .gitignore that excludes .venv/, __pycache__/, *.py[cod] and .env.',
            'Initialize a local Git repository and make separate, meaningful commits for the initial project, ignore rules, and one later improvement.',
            'Use git status and git log --oneline to inspect the final working tree and history.',
            'Optionally connect the repository to a new empty GitHub repository and push the intended branch only after checking the remote and staged files.',
            'Do not add real credentials, generated environment files, or unrelated personal data.',
          ],
          milestones: [
            'Choose a safe parent location, create study-utility, enter it, and verify the working directory.',
            'Create the Python script and README; run the script from the terminal and check its output.',
            'Initialize Git, inspect status, stage the intended source and documentation, and make the first meaningful commit.',
            'Create .gitignore before adding generated or local configuration files; inspect status and commit the ignore rules.',
            'Make one small improvement, review the staged changes, and create a third descriptive commit.',
            'Inspect the final commit list and clean status. Optionally add a branch and merge or publish to a verified GitHub remote.',
          ],
          acceptanceCriteria: [
            'The project is stored in the intended directory and the Python script runs from the terminal.',
            'README instructions accurately describe how to run the script.',
            'The repository contains at least three meaningful commits with messages that describe their changes.',
            'git status shows no unintended generated files, environment directories, credentials, or unstaged work.',
            'The ignore rules are themselves committed and the script, README and .gitignore are tracked.',
            'The learner can explain which changes were staged for each commit and read the history using git log --oneline.',
            'If publishing, the remote URL and branch are verified before push, and no credentials are embedded in repository data.',
          ],
          testCases: [
            'Run the script from the project directory and compare its output with the intended reminder or task list.',
            'Run git status before staging and identify every changed file.',
            'Stage the intended files, inspect git status again, and confirm generated or local-only files are not staged.',
            'After each commit, inspect git log --oneline and explain what that snapshot records.',
            'Create an empty __pycache__ directory or fake .env only if useful for checking ignore behavior; ensure no real secret is used and confirm ignored paths do not appear as ordinary untracked files.',
            'Finish with git status and verify there are no unintended changes left behind.',
          ],
        },
        masteryCriteria: [
          'Explain terminal, shell and command prompt using an example from the operating system used.',
          'Navigate between directories and locate files using relative and absolute paths.',
          'Create, inspect, copy, move and remove only verified disposable files, explaining the risk of destructive operations.',
          'Run a Python script from the terminal and inspect its output and exit status.',
          'Initialize a repository, check status, stage selected files, make descriptive commits and inspect history.',
          'Explain what .gitignore excludes and why it does not erase already tracked files.',
          'Create and switch branches, merge a simple change, and describe a safe first response to a conflict.',
          'Explain the distinction between Git and GitHub and the direction of push and pull.',
          'Keep passwords, API keys, tokens and private credentials out of Git history and explain how to respond if one is exposed.',
          'Complete the Tracked Python Study Utility mini-build with a clean, understandable local Git history.',
        ],
};
