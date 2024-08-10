import { Parser } from 'acorn'
import jsx from 'acorn-jsx'

/**
 * Parses the content of the given file and returns all its exports
 */
export function getExports(code: string): string[] {
  // Parse the code into an AST
  const parser = Parser.extend(jsx())
  const ast = parser.parse(code, {
    sourceType: 'module',
    ecmaVersion: 'latest',
    allowImportExportEverywhere: true,
  })

  const exports = new Set<string>()

  // Walk through the AST
  ast.body.forEach((node) => {
    if (node.type === 'ExportNamedDeclaration') {
      node.specifiers.forEach((specifier) => {
        const { exported } = specifier
        if (exported.type === 'Identifier') {
          exports.add(exported.name)
        }
      })

      const { declaration } = node
      if (declaration?.type === 'VariableDeclaration') {
        const { declarations } = declaration
        declarations.forEach((declaration) => {
          const id = declaration.id
          if (id.type === 'Identifier') {
            exports.add(id.name)
          }
        })
      }
      if (declaration?.type === 'FunctionDeclaration') {
        exports.add(declaration.id.name)
      }
      if (declaration?.type === 'ClassDeclaration') {
        exports.add(declaration.id.name)
      }
    } else if (node.type === 'ExportDefaultDeclaration') {
      exports.add('default')
    }
  })

  return Array.from(exports).sort()
}
