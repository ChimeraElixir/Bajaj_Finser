import React, { useState } from "react"
import axios from "axios"
import Select from "react-select"
import "./App.css"

const App = () => {
  const [jsonInput, setJsonInput] = useState("")
  const [response, setResponse] = useState(null)
  const [error, setError] = useState("")
  const [selectedOptions, setSelectedOptions] = useState([])

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ]

  const handleInputChange = (e) => {
    setJsonInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setResponse(null)

    try {
      // Validate JSON
      const data = JSON.parse(jsonInput)

      // Send POST request to the backend
      const res = await axios.post(
        "https://backend-chimera.onrender.com/bfhl",
        data
      )
      setResponse(res.data)
    } catch (err) {
      setError("Invalid JSON or error from backend")
    }
  }

  const handleDropdownChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions)
  }

  const renderResponse = () => {
    if (!response) return null

    const selectedValues = selectedOptions.map((option) => option.value)
    const filteredResponse = {}

    if (selectedValues.includes("alphabets")) {
      filteredResponse.alphabets = response.alphabets
    }
    if (selectedValues.includes("numbers")) {
      filteredResponse.numbers = response.numbers
    }
    if (selectedValues.includes("highest_alphabet")) {
      filteredResponse.highest_alphabet = response.highest_alphabet
    }

    console.log(filteredResponse);
    return (
      <div className="response">
        <h2>Filtered Response:</h2>
        {/* <pre>{JSON.stringify(filteredResponse?.alphabets, null, 2)}</pre> */}
        <div>
          {filteredResponse?.alphabets && (
            <div>
              Alphabets : {JSON.stringify(filteredResponse?.alphabets, null, 2)}
            </div>
          )}
        </div>
        <div>
          {filteredResponse?.numbers && (
            <div>
              Numbers : {JSON.stringify(filteredResponse?.numbers, null, 2)}
            </div>
          )}
        </div>

        <div>
          {filteredResponse?.highest_alphabet && (
            <div>
              Highest Alphabet: 
              {JSON.stringify(filteredResponse?.highest_alphabet, null, 2)}
            </div>
          )}
        </div>

        {/* <pre>{filteredResponse.map((res,index)=>{
          return (<div>{res.alphabets}</div>)
        })}<pre> */}
      </div>
    )
  }

  return (
    <div className="App">
      <h1>JSON API Tester</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON here, e.g., {"data": ["A", "C", "z"]}'
          rows="6"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Select
        isMulti
        options={options}
        onChange={handleDropdownChange}
        className="dropdown"
      />
      {renderResponse()}
    </div>
  )
}

export default App
