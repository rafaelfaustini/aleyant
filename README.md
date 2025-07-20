# Aleyant Test

## Assumptions

### Json file

The json is provided with the intention of simulating an api response, so it will make more sense to put it in `public` and being able to fetch it via request.

### Performance

There is no mention that the feature is in a critical system that demands top performance, therefore I will aim simplicity while having acceptable performance

### Distinction of business entities

By analysing the provided JSON, the clearest way to distinguish a **category** from a **product** is the absence of `children` in products (being the leaves of the tree). Other approaches of distinction would rely on specific fields like `id` or `price` that are more prone to change than the structure itself.

## Additional Comments

### Dictionary

To avoid multiple tree searching for products, having ids in the categories would allow the front-end to have a map of `categories x products` and directly accessing them.

###

For styling purposes I used icons all in public domain available in https://openclipart.org/
