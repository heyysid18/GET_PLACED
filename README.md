# jobportal-yt-main-6

Quick steps to push this project to GitHub:

1. Make sure .gitignore is present (it ignores .env).
2. If you already committed backend/.env, remove it from the index and commit:
   - git rm --cached backend/.env
   - git commit -m "Remove backend .env from repo"
3. (Optional) Purge sensitive file(s) from history (only if they were ever pushed):
   - Recommended: use BFG or git filter-repo (search their docs). Example (BFG):
     - java -jar bfg.jar --delete-files .env
     - git reflog expire --expire=now --all && git gc --prune=now --aggressive
4. Create a GitHub repo and push:
   - Using GitHub CLI:
     - gh repo create my-repo-name --public --source=. --remote=origin --push
   - Or manually:
     - git remote add origin https://github.com/your-username/your-repo.git
     - git branch -M main
     - git push -u origin main
5. Rotate any exposed secrets in backend/.env (generate new DB credentials, API keys, etc.) and never commit them.

That's it — after these steps your project will be on GitHub and sensitive files will be ignored going forward.
