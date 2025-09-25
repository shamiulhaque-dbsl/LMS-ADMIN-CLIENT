### Grid Component

A reusable **responsive grid system** built with Tailwind CSS.
It provides a consistent way to define layouts, gaps, and responsive breakpoints across the application.

## 🚀 Import

```tsx
import { Grid } from "@/components/ui/grid";
```

## Props

```tsx
| Prop        | Type   | Default | Description                                      |
| ----------- | ------ | ------- | ------------------------------------------------ |
| `cols`      | number | `1`     | Number of columns (`1–12`).                      |
| `gap`       | number | `4`     | Gap between grid items (Tailwind spacing scale). |
| `sm`        | number | -       | Columns for `sm` breakpoint.                     |
| `md`        | number | -       | Columns for `md` breakpoint.                     |
| `lg`        | number | -       | Columns for `lg` breakpoint.                     |
| `xl`        | number | -       | Columns for `xl` breakpoint.                     |
| `className` | string | -       | Custom class overrides.                          |
```

## Grid.Item

```tsx
| Prop        | Type   | Default | Description                  |
| ----------- | ------ | ------- | ---------------------------- |
| `colSpan`   | number | -       | Number of columns to span.   |
| `rowSpan`   | number | -       | Number of rows to span.      |
| `sm`        | number | -       | Responsive col-span at `sm`. |
| `md`        | number | -       | Responsive col-span at `md`. |
| `lg`        | number | -       | Responsive col-span at `lg`. |
| `xl`        | number | -       | Responsive col-span at `xl`. |
| `className` | string | -       | Custom class overrides.      |
```

## Usage Example

# Basic Example:

```tsx
<Grid cols={4} gap={6}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
  <Card>4</Card>
</Grid>
```

# Basic Example:

```tsx
<Grid cols={1} sm={2} md={3} lg={4}>
  {Array.from({ length: 8 }, (_, i) => (
    <Card key={i}>Item {i + 1}</Card>
  ))}
</Grid>
```

# Grid with Item Spans:

```tsx
<Grid cols={4}>
  <Grid.Item colSpan={2}>
    <Card>Big Item</Card>
  </Grid.Item>
  <Grid.Item>
    <Card>Small Item</Card>
  </Grid.Item>
  <Grid.Item>
    <Card>Small Item</Card>
  </Grid.Item>
</Grid>
```

# Best Practices:

[] Always use valid Tailwind spacing values for gap (1–12 recommended).
[] Use Grid.Item only when you need spans; otherwise, children can be any component.
[] Prefer this Grid over raw grid-cols-x to keep layouts consistent across the app.
