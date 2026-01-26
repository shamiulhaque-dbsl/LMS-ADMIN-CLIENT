### **/docs/ReusableImage.md**

````markdown
# ReusableImage Component

## Overview

The `ReusableImage` component is a highly customizable image element that supports fallback images, error handling, and custom fallbacks. It is designed to handle cases where the image fails to load, either by displaying a default fallback image or a custom fallback component.

## Props

- `src` (string): **Required** - The URL of the image to display.
- `alt` (string): Alternative text for the image (default: `"Image"`).
- `width` (number): The width of the image (default: `200`).
- `height` (number): The height of the image (default: `200`).
- `objectFit` ("cover" | "contain" | "fill" | "none" | "scale-down"): The image's object fit style (default: `"cover"`).
- `className` (string): Additional Tailwind CSS classes to style the container (default: `""`).
- `fallbackSrc` (string): The URL for the fallback image (default: `"/images/hero.webp"`).
- `fallbackComponent` (React.ReactNode): A custom fallback component (default: `null`).

## Usage Example

### Basic Example:

```tsx
<ReusableImage src="https://example.com/image.jpg" alt="Product Image" width={400} height={400} />
```
````
