# Backend

# Run backend locally

For developement, run the mongo docker and redis container and then run `yarn start` in the `api` folder:

```
yarn start:services
yarn start
```

Then run the express server:

```
yarn start
```

# To access the database

```
docker exec -it mongo bash
```

Then start the mongo shell:

```
# mongo
> show dbs
```

# To stop mongo and redis

```
yarn run stop:services
```
