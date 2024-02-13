# fsdx

A command-line tool for generating folder structures using the [Feature-Sliced Design](https://feature-sliced.design) methodology.

# Table of Contents

- [Installation](#installation)
- [Commands](#commands)
- [Examples](#examples)

## FSD Methodology

Feature-Sliced Design (FSD) is an architectural methodology for building frontend applications. It is a collection of rules and conventions for organizing code, with the main goal of making the project more understandable and structured in the face of constantly changing business requirements . FSD can be implemented in projects and teams of any size, but there are a few things to keep in mind.

For more information about the Feature-Sliced Design methodology and its principles, refer to the [FSD Methodology Guide](https://feature-sliced.design).

## Installation

You can install the fsdx both globally and locally. Here's how:

### Global Installation

Install the FSD CLI globally using the following command:

```bash
npm install -g fsdx
```

After global installation, you can use the `fsdx` command directly from the terminal.

### Local Installation

To install the FSD CLI locally in your project, use the following command:

```bash
npm install fsdx
```

You can then use the FSD CLI using `npx fsdx` from the terminal within your project directory.

## Commands

The fsdx provides the following commands with their aliases and descriptions:

| Command    | Alias | Description                                 | Options          |
| ---------- | ----- | ------------------------------------------- | ---------------- |
| `init`     | `i`   | Initialize the initial FSD configuration.   | `-y, --yes`      |
| `generate` | `g`   | Generate the FSD structure.                 | `-t, --template` |
| `examples` | `e`   | Show usage examples for available commands. |                  |

---

### Command: `init|i`

The `init` command enables you to create an initial configuration file for use with the Feature Sliced Design (FSD). This configuration file customizes the generated folder structure to align with your project's specific requirements.

Options for `init`:

- `-y, --yes`: Skip prompts and proceed with default options.

When you execute the `init` command, you'll encounter a series of prompts that guide you through the configuration process. These prompts help tailor the FSD structure to your project's unique needs. The prompts include:

1. **CSS Method**: Choose your preferred method of working with CSS.

2. **CSS Preprocessor**: Specify a CSS preprocessor if applicable (optional).

3. **CSS-in-JS Solution**: Select a CSS-in-JS solution if you've chosen `CSS-in-JS`.

4. **TypeScript or JavaScript**: Indicate whether you're working with TypeScript or JavaScript.

5. **Framework**: Specify the framework you're using.

6. **Tests**: Define the test file postfix.

7. **Documentation Formats**: Choose desired documentation formats.

8. **State Management Solution**: Select your preferred state management solution.

These prompts allow you to create an initial configuration tailored to your project's needs, which will later be used for generating the FSD structure.

---

### Command: `generate|g`

When you use the `generate` command, you will be prompted to choose the type of FSD structure you want to generate.

Options for `generate`:

- `-t, --template`: Auto-generate files with templates for the FSD Structure.

Prompts during the `generate` command:

1. **Choose an FSD Layer**: Select the FSD layer you want to generate. Options include `layer`, `slice`, and `segments`.

   - **Layer**: Creates the basic FSD structure with layers such as `app`, `pages`, `features`, `widgets`, `entities`, and `shared`.

   - **Slice**: Allows you to specify a slice name. Afterward, you will be prompted with questions related to segments.

   - **Segments**: Customize segments for the selected slice. Choose from options like `ui`, `model`, `api`, `lib`, and `public API`.

2. **Choose Segments (default: ui, model, api, lib, and public API)**: If you selected `slice` or `segments` earlier, you can choose full segments for the slice. The default options are `ui`, `model`, `api`, `lib`, and `public API`.

## Examples

Here are a few examples of how to use the FSD CLI:

1. Initialize the initial FSD configuration:

   ```bash
   fsdx init
   ```

   This will guide you through setting up your FSD configuration.

2. Generate the FSD structure:

   ```bash
   fsdx generate
   ```

   This will generate the folder structure based on your FSD configuration.

3. Generate the FSD structure with example content:

   ```bash
   fsdx examples
   ```

   This will generate the folder structure with example content to help you get started.

## License

This project is licensed under the [MIT License](LICENSE).
