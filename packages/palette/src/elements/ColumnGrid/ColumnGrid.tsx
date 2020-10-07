import React, { useMemo } from "react"
import styled from "styled-components"
import { gridColumn, GridColumnProps } from "styled-system"
import { Box, BoxProps } from "../Box"
import { CSSGrid, CSSGridProps } from "../CSSGrid"

/** ColumnGrid implements `Box` and the common grid properties */
export type ColumnGridProps = CSSGridProps

/**
 * A 12-column fluid grid. Collapses to a single column at mobile breakpoints.
 */
export const ColumnGrid = styled(CSSGrid)``

ColumnGrid.defaultProps = {
  gridColumnGap: 2,
  gridRowGap: 2,
  gridTemplateColumns: "repeat(12, 1fr)",
}

type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type ColumnStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface ColSpanProps {
  span?: ColumnSpan | ColumnSpan[]
  start?: ColumnStart | ColumnStart[]
}

type __ColumnProps__ = ColSpanProps & GridColumnProps & BoxProps

const __Column__ = styled(Box)<__ColumnProps__>`
  ${gridColumn}
`

/**
 * Builds a value for `gridColumn` based on the assumptions laid out
 * by our 12-column grid.
 */
export const calculateGridColumn = ({ span, start }: ColSpanProps) => {
  const spans = (() => {
    if (typeof span === "undefined") return [] as ColumnSpan[]
    return typeof span === "number" ? [span] : span
  })()

  const starts = (() => {
    if (typeof start === "undefined") return [] as ColumnStart[]
    return typeof start === "number" ? [start] : start
  })()

  // Nothing set, return default
  if (spans.length === 0 && starts.length === 0) {
    return []
  }

  // More starts than spans, zip them and favor start
  if (starts.length > spans.length) {
    return starts.map((n, i) => {
      const x =
        spans[i] !== null && spans[i] !== undefined
          ? spans[i]
          : spans[spans.length - 1]

      if (x && x + n > 13) {
        throw new Error("`span` and `start` must fit within the grid")
      }

      return x ? `${n} / span ${x}` : `${n} / -1`
    })
  }

  // Zip starts and spans, or spans and the only start
  return spans.map((n, i) => {
    const x =
      starts[i] !== null && starts[i] !== undefined
        ? starts[i]
        : starts[starts.length - 1]

    if (x && x + n > 13) {
      throw new Error("`span` and `start` must fit within the grid")
    }

    return x ? `${x} / span ${n}` : `span ${n}`
  })
}

/** Column implements `Box` and `gridColumn` */
export type ColumnProps = __ColumnProps__ & { breakAfter?: boolean }

/**
 * A column sits within the ColumnGrid and spans the columns,
 * sitting between gutters.
 * @param span number (between 1 and 12) of columns to span
 * @param start number (between 1 and 12) of columns to begin at
 * @param breakAfter boolean denoting whether or not to break to a new row after column
 */
export const Column: React.FC<ColumnProps> = ({
  span,
  start,
  breakAfter,
  ...rest
}) => {
  const value = useMemo(() => {
    return calculateGridColumn({ span, start })
  }, [span, start])

  return (
    <>
      <__Column__ gridColumn={["1 / -1", ...value]} {...rest} />
      {breakAfter && <ColumnBreak />}
    </>
  )
}

/**
 * Utility for breaking after a non full-width column.
 * Fills until the end of the row.
 */
export const ColumnBreak = styled(Column)``

ColumnBreak.defaultProps = {
  display: ["none", "block"],
  gridColumn: "auto / -1",
}
