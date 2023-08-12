# FSD CLI Program

A command-line tool for effortlessly generating folder structures using the [Feature-Sliced Design](https://feature-sliced.design) methodology.

# Table of Contents

- [Installation](#installation)
- [Commands](#commands)
- [Examples](#examples)

## FSD Methodology

Feature-Sliced Design (FSD) is an architectural methodology for building frontend applications. It is a collection of rules and conventions for organizing code, with the main goal of making the project more understandable and structured in the face of constantly changing business requirements . FSD can be implemented in projects and teams of any size, but there are a few things to keep in mind.

For more information about the Feature-Sliced Design methodology and its principles, refer to the [FSD Methodology Guide](https://feature-sliced.design).

## Installation

You can install the FSD CLI program both globally and locally. Here's how:

### Global Installation

Install the FSD CLI globally using the following command:

```bash
npm install -g fsd-cli
```

After global installation, you can use the `fsd-cli` command directly from the terminal.

### Local Installation

To install the FSD CLI locally in your project, use the following command:

```bash
npm install fsd-cli
```

You can then use the FSD CLI using `npx fsd-cli` from the terminal within your project directory.

## Commands

The FSD CLI program provides the following commands with their aliases and descriptions:

| Command      | Alias | Description                                      |
| ------------ | ----- | ------------------------------------------------ |
| `--init`     | `-i`  | Initialize the initial FSD configuration.        |
| `--generate` | `-g`  | Generate the FSD structure.                      |
| `--examples` | `-e`  | Generate the FSD structure with example content. |

---

### Command: `--init`

When you run the `--init` command, you will create an initial configuration file for further work with the Feature Sliced Design (FSD). This configuration allows you to customize the generated folder structure to match your project's requirements.

The prompts you'll encounter during the `--init` command are as follows:

1. **CSS Method**: Choose your preferred method of working with CSS.

2. **CSS Preprocessor**: If you use a CSS preprocessor, specify it here. This option is optional.

3. **CSS-in-JS Solution**: If you chose `CSS-in-JS`, select a solution.

4. **TypeScript or JavaScript**: Indicate whether you are working with TypeScript or JavaScript.

5. **Framework**: Specify your framework.

6. **Tests**: Define the test file postfix.

7. **Documentation Formats**: Choose desired documentation formats.
8. **State Management Solution**: Select your preferred state management solution.

These prompts allow you to create an initial configuration tailored to your project's needs, which will later be used for generating the FSD structure.

---

### Command: `--generate`

When you use the `--generate` command, you will be prompted to choose the type of FSD structure you want to generate.

1. **Choose an FSD Layer**: Select the FSD layer you want to generate. Options include `layer`, `slice`, and `segments`.

   - **Layer**: Creates the basic FSD structure with layers such as `app`, `pages`, `features`, `widgets`, `entities`, and `shared`.

   - **Slice**: Allows you to specify a slice name. Afterward, you will be prompted with questions related to segments.

   - **Segments**: Customize segments for the selected slice. Choose from options like `ui`, `model`, `api`, `lib`, and `public API`.

2. **Choose Segments (default: ui, model, api, lib, and public API)**: If you selected `slice` or `segments` earlier, you can choose full segments for the slice. The default options are `ui`, `model`, `api`, `lib`, and `public API`.

These prompts let you generate the FSD structure based on your project's architecture requirements.

## Examples

Here are a few examples of how to use the FSD CLI:

1. Initialize the initial FSD configuration:

   ```bash
   fsd-cli --init
   ```

   This will guide you through

setting up your FSD configuration.

2. Generate the FSD structure:

   ```bash
   fsd-cli --generate
   ```

   This will generate the folder structure based on your FSD configuration.

3. Generate the FSD structure with example content:

   ```bash
   fsd-cli --examples
   ```

   This will generate the folder structure with example content to help you get started.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

We welcome contributions from the community. If you'd like to contribute to the FSD CLI, please read our [Contribution Guidelines](https://your-contribution-guidelines-url.com).
