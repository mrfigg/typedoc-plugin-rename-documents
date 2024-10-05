/**
 * @packageDocumentation
 *
 * @document ../LICENSE
 */

'use strict'

import { resolve } from 'node:path'

import {
  Application,
  ParameterType,
  ReflectionKind,
  Converter,
  Reflection,
} from 'typedoc'

/** @private */
export function load(app: Application) {
  app.options.addDeclaration({
    name: 'renameDocuments',
    help: 'A Record<string, string> of document files to be renamed and their new names',
    type: ParameterType.Object,
    defaultValue: {},
  })

  const renameDocuments: Record<string, string> = {}

  app.converter.on(Converter.EVENT_BEGIN, () => {
    for (const [file, name] of Object.entries(
      (app.options.getValue('renameDocuments') ?? {}) as Record<string, string>
    )) {
      const resolvedFile = resolve(file).replace(/\\/g, '/')

      renameDocuments[resolvedFile] = name
    }
  })

  app.converter.on(Converter.EVENT_RESOLVE, (context, reflection) => {
    if (reflection.kind !== ReflectionKind.Document) {
      return
    }

    // DOLATER: find a non-hack way to get path from reflection
    const reflectionPath = (
      context.project.files as unknown as {
        reflectionToPath: Map<Reflection, string>
      }
    ).reflectionToPath.get(reflection)

    if (!reflectionPath || !renameDocuments[reflectionPath]) {
      return
    }

    reflection.name = renameDocuments[reflectionPath]
  })
}
