# How to ose the Article List component

## Description

The `Article List` component is a simple component that allows you to display a list of articles.

## Usage

To use the `Article List component`, you need to add the following snippet to your markdown file:

```markdown
:article-list
```

To use it with the `parent` parameter, you need to add the following snippet to your markdown file:

```markdown
<!-- markdownlint-disable MD003 MD007 -->
::article-list
---

parent: <parent>

---
::
<!-- markdownlint-enable MD003 MD007 -->
```

## Parameters

The `Article List` component accepts the following parameters:

| Parameter | Description | Default value | Required |  
| --- | --- | --- | --- |
| `parent` | The parent of the articles to display | `null` | `false` |
