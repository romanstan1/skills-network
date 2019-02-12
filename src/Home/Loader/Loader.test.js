import React from "react"
import {mount} from "enzyme"
import Loader from "./Loader"


describe("Test Loader Component", () => {
  const failedData = true
  const fetchData = jest.fn()
  const component = mount(
    <Loader
      failedData={failedData}
      fetchData={fetchData} />
  )

  const loaderElement = component.find(".loader")
  test("Renders Loader element", () => {
    expect(loaderElement).toHaveLength(1)
  })

  const bubbleElements = loaderElement.find(".bubble")
  test("Renders all 4 bubble elements", () => {
    expect(bubbleElements).toHaveLength(4)
  })

  const failedDataProp = component.prop("failedData")
  const retryButton = loaderElement.find(".retry-button")
  test("Passes through failedData prop and renders retryButton element", () => {
    expect(failedDataProp).toEqual(true)
    expect(retryButton).toHaveLength(1)
  })

  test("retryButton can be clicked and calls fetchData function", () => {
    retryButton.simulate("click")
    expect(fetchData).toHaveBeenCalled()
  })
})
