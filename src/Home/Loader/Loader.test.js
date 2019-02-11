import React from "react"
import {mount} from "enzyme"
import Loader from "./Loader"

test("Renders correct ui elements", () => {
  const failedData = true
  const fetchData = jest.fn()
  const component = mount(
    <Loader
      failedData={failedData}
      fetchData={fetchData} />
  )

  const loaderElement = component.find(".loader")
  expect(loaderElement).toHaveLength(1)

  const bubbleElements = loaderElement.find(".bubble")
  expect(bubbleElements).toHaveLength(4)

  const failedDataProp = component.prop("failedData")
  expect(failedDataProp).toEqual(true)

  const retryButton = loaderElement.find(".retry-button")
  expect(retryButton).toHaveLength(1)

  retryButton.simulate("click")
  expect(fetchData).toHaveBeenCalled()
})
