# How to use the Picture component

## Description

The `Picture` component is a simple component
that allows you to display a set of images in a carousel.


## Available sizes

The `Picture` component is available in the following sizes:

- `xs` - extra small (320px)
- `sm` - small (640px)
- `md` - medium (768px)
- `lg` - large (1024px)
- `xl` - extra large (1280px)
- `xxl` - extra extra large (1536px)


## Usage - Single image (\<img\> tag)

To use the `Picture` component in the Single Image mode, you need to add the following snippet to your markdown file:

```markdown
<!-- markdownlint-disable MD003 MD007 -->
::picture-component
---

image:
  src: https://inzynierjakosci.pl/wp-content/uploads/2022/09/image-1.png
  size: xs

alt: Image

---
::
<!-- markdownlint-enable MD003 MD007 -->
```

## Usage - Multiple images (\<picture\> tag)

To use the `Picture` component in the Multiple Images mode, you need to add the following snippet to your markdown file:

```markdown

<!-- markdownlint-disable MD003 MD007 -->
::picture-component
---

images:

- src: https://inzynierjakosci.pl/wp-content/uploads/2022/09/image-1.png
  size: xs
- src: https://inzynierjakosci.pl/wp-content/uploads/2022/09/image-2.png
  size: sm
- src: https://inzynierjakosci.pl/wp-content/uploads/2022/09/image-3.png
  size: md

alt: Image

---
::
<!-- markdownlint-enable MD003 MD007 -->
```

