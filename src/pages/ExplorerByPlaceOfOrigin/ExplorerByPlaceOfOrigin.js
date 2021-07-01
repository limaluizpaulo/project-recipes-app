import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ExplorerByPlaceOfOrigin() {
  return(<>
		<Header />
		<h1>Explorar comidas pelo local de origem</h1>
		<select>
			<option>
				Canadá
			</option>
			<option>
				Brasil
			</option>
		</select>
		<Footer />
	</>);
}
export default ExplorerByPlaceOfOrigin;
