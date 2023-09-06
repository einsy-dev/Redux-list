import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

export default function App() {
    const [type, setType] = useState('Add')
    const data = useSelector((state) => state);
    const dispath = useDispatch();

    function DispatchAdd() {
        if (type === 'Add') {
            dispath({ type: 'ADD', payload: document.getElementById('textInput').value })
            document.getElementById('textInput').value = ''
        }
        else {
            dispath({ type: 'EDIT', payload: { id: type, value: document.getElementById('textInput').value } })
            setType('Add')
            document.getElementById('textInput').value = ''
        }


    }
    function DispatchEdit(item, index) {
        document.getElementById('textInput').value = item;
        document.getElementById('textInput').focus();
        setType(index)
    }

    return (
        <div className="container my-4 p-0">
            <div className="input-group mb-3">
                <input onKeyDown={(e) => e.key === 'Enter' && DispatchAdd()} type="text" className="form-control" id='textInput' />
                <span className="input-group-text" id="basic-addon2">
                    <button onClick={() => DispatchAdd()} className="btn btn-outline-primary me-2 py-1">Save</button>
                    <button onClick={() => { document.getElementById('textInput').value = '', setType('Add') }} className="btn btn-outline-danger py-1">Cancel</button>
                </span>
            </div>
            <div className="">
                <ul className="list-group list-group-flush">
                    {data?.map((item, index) =>
                        <li className="list-group-item" key={index}>
                            <span>{item}</span>
                            <button onClick={() => DispatchEdit(item, index)} className="btn btn-outline-primary me-2 mx-2 py-0">&#9999;</button>
                            <button onClick={() => { dispath({ type: 'DELETE', payload: index }) }} className="btn btn-outline-danger py-0">&#128465;</button>
                        </li>
                    )}
                </ul>
            </div>
        </div >
    )
}
