import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "../styles/ReactSelect.css"; // Impor file CSS

const animatedComponents = makeAnimated();

const ReactSelect = ({ name, value, options, onChange }) => {
     return (
          <Select
               name={name}
               value={value}
               closeMenuOnSelect={false}
               components={animatedComponents}
               isMulti
               options={options}
               onChange={onChange}
               classNamePrefix="react-select" // Tambahkan prefix class untuk mengaktifkan gaya
          />
     );
}

export default ReactSelect;
