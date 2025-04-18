
tree -L 3 -I "node_modules|dist|.git"      


# Deploy

```
npm run build
aws s3 sync dist/ s3://flowforgestaticsitestack-flowforgesitebucketcd37c8-xoessdfhxmr1 --delete --profile personal
```


FIX
- change sign button to something else, i don't know, and avatar or something?
- Language
- accessibility