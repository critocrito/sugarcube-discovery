# Sugarcube Discovery

A browser extension to facilitate a discovery/preservation process for human rights investigators. Sends discovered content to N-Cube and queued for preservation with [Sugarcube](https://github.com/critocrito/sugarcube). See [the website](https://sugarcubetools.net/) for more details.

## Installation

This extension is still in early development. There are no packages yet distributed on `addon.mozilla.org`. [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out) has instructions how to load an extension temporarily into Firefox.

```shell
yarn install
yarn build
```

## Development

Use Firefox and [`web-ext`](https://www.npmjs.com/package/web-ext) to develop the browser extension. Development works only on Firefox for the time being.

```shell
yarn start
```

The API requires the latest Rust.

```shell
cargo run
```

The API is just a stub for now. You can test the stub route with:

```shell
curl -X POST -H "Content-Type: application/json" localhost:8000/ -d '{"qterm":"haha","qtype":"huhu"}'
```
