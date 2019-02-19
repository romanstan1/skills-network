import React from "react"
import {mount} from "enzyme"
import Home from "./Home"

describe("Test Home Component", () => {
  const component = mount(
    <Home
      failedData={failedData}
      fetchData={fetchData} />
  )
})
