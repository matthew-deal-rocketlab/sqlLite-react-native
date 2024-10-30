#!/bin/sh

# any packages added to this project should be added here first

# react-native-screens react-native-safe-area-context required by @react-navigation/native
# react-native-gesture-handler required by @react-navigation/stack

pnpm add --prefer-offline buffer \
  styled-components react-native-svg \
  react-native-screens react-native-safe-area-context react-native-gesture-handler @react-navigation/stack \
  @react-native-async-storage/async-storage

pnpm add --prefer-offline -D @types/styled-components @types/styled-components-react-native \
  @svgr/cli

# Good extras to include in projects
# pnpm add moment-timezone
# pnpm add -D @types/moment

# cd ios ; pod install ; cd ..
