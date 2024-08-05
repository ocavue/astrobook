import fs from 'node:fs/promises'

import { Parser } from 'acorn'
import jsx from 'acorn-jsx'

export type ParsedStoryFile = {
  /**
   * The absolute path to the file
   */
  filePath: string

  /**
   * Whether the file has a default export
   */
  defaultExport: boolean

  /**
   * The named exports in the file
   */
  namedExports: string[]
}

export async function parseStoryFile(
  filePath: string,
): Promise<ParsedStoryFile> {
  const code = await fs.readFile(filePath, 'utf-8')
  const exports = getExports(code)
  const defaultExport = exports.includes('default')
  const namedExports = exports.filter((name) => name !== 'default')
  return { filePath, defaultExport, namedExports }
}

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
