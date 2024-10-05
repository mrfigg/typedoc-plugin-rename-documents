# typedoc-plugin-rename-documents

A plugin for TypeDoc that renames documents without a yaml frontmatter section.

## Example

A basic example is available at [https://mrfigg.github.io/typedoc-plugin-rename-documents](https://mrfigg.github.io/typedoc-plugin-rename-documents).

## Installation

```sh
$ npm install -D typedoc-plugin-rename-documents
```

## Options

The following options are added to TypeDoc when the plugin is installed:

| Option              | Type                   | Default | Description                                                                                                        |
| ------------------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| **renameDocuments** | Record<string, string> | `{}`    | A mapping of document files to be renamed. The key is the path to the document file and the value is the new name. |
