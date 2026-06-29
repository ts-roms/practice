// Shared styling so code blocks clearly stand apart from prose across all tabs.
export const CODE_BG = '#0d1117' // GitHub-dark
export const CODE_FG = '#e6edf3'
export const CODE_BORDER = '1px solid #30363d'

// Inline style for raw-source <pre> blocks (Tests / Solution panels).
export const preStyle = {
  background: CODE_BG,
  color: CODE_FG,
  border: CODE_BORDER,
  padding: 14,
  borderRadius: 8,
  overflow: 'auto',
}

// CSS for code rendered inside markdown (prefix = the wrapper class, e.g. 'md').
// Block code = dark; inline code = a light chip so it reads within text.
export const mdCodeCss = (prefix) => `
.${prefix} pre { background: ${CODE_BG}; color: ${CODE_FG}; border: ${CODE_BORDER}; padding: 12px 14px; border-radius: 8px; overflow: auto; }
.${prefix} pre code { background: none; padding: 0; color: inherit; border: none; }
.${prefix} code { background: #eef1f4; color: #b1003e; padding: .15em .4em; border-radius: 6px; font-size: 85%; }
`
