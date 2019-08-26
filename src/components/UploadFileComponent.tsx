import React, { FunctionComponent, CSSProperties, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const inputUploadFile: CSSProperties = {
    display: 'none',
};

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFileComponent: FunctionComponent<Props> = ({ onChange }) => (
    <div className="vertical-center-row">
        <div style={{textAlign:"center"}}>
            <input accept="image/*" style={inputUploadFile} id="file" multiple={false} type="file"
                onChange={onChange} />
            <label htmlFor="file">
                <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
            </label>
        </div>
    </div>
);

export default UploadFileComponent;