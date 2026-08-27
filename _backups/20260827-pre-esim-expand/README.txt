Backup before expanding eSIM to all regions + 地球の歩き方eSIM.

Rollback:
  git checkout pre-esim-expand-20260827-2034
  # or
  git checkout main -- .
  git checkout feat/esim-expand-all-regions -- .  # if only undoing uncommitted

Branch: feat/esim-expand-all-regions
Base commit: a8790ad
