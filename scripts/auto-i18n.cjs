const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { parse } = require('@vue/compiler-sfc');
const { compileTemplate } = require('@vue/compiler-sfc');

const SRC_DIR = path.join(__dirname, '../src');
const VUE_FILES = glob.sync('**/*.vue', { cwd: SRC_DIR, absolute: true });

const textToKey = new Map();

function generateKey(text) {
  let key = text
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.|\.$/g, '');
  let finalKey = key;
  let counter = 1;
  while ([...textToKey.values()].includes(finalKey)) {
    finalKey = `${key}_${counter++}`;
  }
  return finalKey;
}

function processTemplateNode(node, replacements) {
  if (!node) return;
  
  // 1. Texto plano
  if (node.type === 2 && node.content && node.content.trim()) {
    const content = node.content.trim();
    if (!content.match(/^\d+$/) && !content.startsWith('$t(')) {
      if (!textToKey.has(content)) {
        const key = generateKey(content);
        textToKey.set(content, key);
      }
      replacements.push({
        start: node.loc.start.offset,
        end: node.loc.end.offset,
        replacement: `{{ $t('${textToKey.get(content)}') }}`
      });
    }
  }
  
  // 2. Atributos estáticos (sem ':')
  if (node.props) {
    for (const prop of node.props) {
      if (prop.type === 6 && prop.value && prop.value.content) {
        const attrName = prop.name;
        // Ignorar atributos que não devem ser traduzidos
        if (['src', 'href', 'to', 'class', 'style', 'key', 'ref', 'alt'].includes(attrName)) continue;
        const content = prop.value.content.trim();
        if (content && !content.match(/^\d+$/) && !content.startsWith('$t(')) {
          if (!textToKey.has(content)) {
            const key = generateKey(content);
            textToKey.set(content, key);
          }
          replacements.push({
            start: prop.value.loc.start.offset,
            end: prop.value.loc.end.offset,
            replacement: `$t('${textToKey.get(content)}')`
          });
        }
      }
    }
  }
  
  // 3. Filhos
  if (node.children) {
    for (const child of node.children) {
      processTemplateNode(child, replacements);
    }
  }
}

function processTemplate(content) {
  const { descriptor } = parse(`<template>${content}</template>`);
  if (!descriptor.template || !descriptor.template.ast) return content;
  const ast = descriptor.template.ast;
  const replacements = [];
  processTemplateNode(ast, replacements);
  // Aplicar substituições do final para o início
  let modified = content;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    modified = modified.slice(0, r.start) + r.replacement + modified.slice(r.end);
  }
  return modified;
}

VUE_FILES.forEach(file => {
  const source = fs.readFileSync(file, 'utf8');
  const { descriptor } = parse(source);
  if (!descriptor.template) return;
  const originalTemplate = descriptor.template.content;
  const newTemplate = processTemplate(originalTemplate);
  if (newTemplate !== originalTemplate) {
    const newSource = source.replace(originalTemplate, newTemplate);
    fs.writeFileSync(file, newSource, 'utf8');
    console.log(`✅ Atualizado: ${file}`);
  } else {
    console.log(`➖ Sem alterações: ${file}`);
  }
});

// Gera JSONs
const pt = {};
const en = {};
for (const [text, key] of textToKey.entries()) {
  pt[key] = text;
  en[key] = text;
}
const localesDir = path.join(__dirname, '../src/locales');
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir, { recursive: true });
fs.writeFileSync(path.join(localesDir, 'pt-BR.json'), JSON.stringify(pt, null, 2));
fs.writeFileSync(path.join(localesDir, 'en-US.json'), JSON.stringify(en, null, 2));
console.log(`\n🎉 Total de chaves geradas: ${textToKey.size}`);