import { storiesOf } from "@storybook/react"
import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Column, ColumnBreak, ColumnGrid } from "./ColumnGrid"

const IPSUM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto deleniti recusandae ullam laudantium ut reiciendis, doloribus qui sequi id ea, ad suscipit eos placeat magnam consequatur sunt, quaerat eius saepe."

const ColumnGridDebug = () => (
  <ColumnGrid
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    style={{ pointerEvents: "none" }}
  >
    {[...new Array(12)].map((_, i) => (
      <Column key={i} span={1} bg="rgba(255, 0, 0, 0.05)" height="100%" />
    ))}
  </ColumnGrid>
)

storiesOf("Components/ColumnGrid", module)
  .add("Real-world Example", () => {
    return (
      <ColumnGrid position="relative" m={2}>
        <ColumnGridDebug />

        <Column span={6} breakAfter>
          <Text as="h1" variant="largeTitle">
            Page Title Long Enough So As To Line Break
          </Text>
        </Column>

        <Column span={6}>
          <Text as="h2" variant="subtitle" mb={1}>
            Page subtitle
          </Text>

          <Text>{IPSUM}</Text>
        </Column>

        <Column span={5} start={8}>
          <Text variant="mediumText" mb={1}>
            Featured content
          </Text>

          <Box bg="black10" borderRadius={4} height={400} />
        </Column>
      </ColumnGrid>
    )
  })
  .add("Kitchen sink", () => {
    return (
      <ColumnGrid border="1px solid blue" position="relative">
        <ColumnGridDebug />

        <Column border="1px solid red" span={4}>
          <Text>{IPSUM}</Text>
        </Column>

        <Column border="1px solid red" span={4}>
          <Text>{IPSUM}</Text>
        </Column>

        <Column border="1px solid green" span={4}>
          <Text>{IPSUM}</Text>
        </Column>

        <Column border="1px solid red" span={4}>
          <Text>
            {IPSUM} {IPSUM}
          </Text>
        </Column>

        <ColumnBreak border="1px solid red" />

        <Column
          start={[2, 3, 4]}
          span={[9, 6, 3]}
          height={300}
          bg="black10"
          borderRadius={4}
        />

        <ColumnBreak />

        <Column bg="black100" start={4}>
          <Text color="white100">{IPSUM}</Text>
        </Column>

        <Column border="1px solid red" span={4} start={1}>
          <Text>{IPSUM}</Text>
        </Column>

        <Column border="1px solid red" span={4} start={6}>
          <Text>{IPSUM}</Text>
        </Column>

        <Column border="1px solid red" span={2} start={11}>
          <Text>{IPSUM}</Text>
        </Column>

        <Column bg="red" span={1} start={1} height={100} breakAfter />

        <Column bg="red" span={1} start={2} height={100} breakAfter />

        <Column bg="red" span={1} start={3} height={100} breakAfter />

        <Column bg="red" span={1} start={4} height={100} breakAfter />

        <Column bg="red" span={1} start={5} height={100} breakAfter />

        <Column bg="red" span={1} start={6} height={100} breakAfter />

        <Column bg="red" span={1} start={7} height={100} breakAfter />

        <Column gridColumn="3 / 9" bg="purple100">
          <Text color="white100">A custom grid-column value</Text>
        </Column>
      </ColumnGrid>
    )
  })
  .add("Custom gutters", () => {
    return (
      <ColumnGrid gridColumnGap={4} gridRowGap={1}>
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
        <Column span={2} bg="black10" height={100} />
      </ColumnGrid>
    )
  })
