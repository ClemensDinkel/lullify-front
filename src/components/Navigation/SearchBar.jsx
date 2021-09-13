import { Form, FormControl, Button } from "react-bootstrap"

const SearchBar = ({lang, setLang, filter, updateSearchBar, setFilter, show}) => {

  return (
    <Form className="d-flex justify-content-space-between" onSubmit={updateSearchBar}>
      <Form.Control
        as="select"
        className="my-1 mr-sm-2"
        id="inlineFormCustomSelectPref"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        custom
      >
        <option value=""></option>
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="hi">HI</option>
      </Form.Control>
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
        name="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button type="submit" variant={`dark ${show && "light"}`} >
        <b>Search</b>
      </Button>
    </Form>
  )
}

export default SearchBar