module.exports = {
  root: true,
  extends: '@react-native',
  // Rules we like to use in our projects
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: { 'curly': 'off' }
    }
  ]
};
