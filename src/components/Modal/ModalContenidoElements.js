import styled from "styled-components";

export const ContenedorBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: end;
	gap: 20px;
`;

export const Boton = styled.button`
	font-size: 1.25em;
	color: var(--bg-color);
	background-color: var(--primary-color);
	padding: .5em 1em;
	border: none;
	border-radius: .5em;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all .3s ease-in-out;
	margin-right: ${p => p.mr || "0" }; 
	margin-top: ${p => p.mt || "0" };

	&:hover {
		/* transform: scale(1.1); */
		border: 2px solid var(--primary-color);
		color: var(--fg-color);
		background-color: transparent;
	}
	
	&:disabled {
		background-color: var(--secondary-color);
	}

`;

export const Boton2 = styled.button`
	font-size: 1.25em;
	border: 2px solid var(--primary-color);
	color: var(--fg-color);
	background-color: transparent;
	padding: .5em 1em;
	border-radius: .5em;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all .3s ease-in-out;
	margin-right: ${p => p.mr || "0" }; 
	margin-top: ${p => p.mt || "0" };

	&:hover {
		/* transform: scale(1.1); */
		border: none;
		color: var(--bg-color);
		background-color: var(--secondary-color);
	}

`;

export const Boton3 = styled.button`
	font-size: 1.25em;
	border: 2px solid var(--danger-color);
	color: var(--danger-color);
	background-color: transparent;
	padding: .5em 1em;
	border-radius: .5em;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all .3s ease-in-out;
	margin-right: ${p => p.mr || "0" }; 
	margin-top: ${p => p.mt || "0" };

	&:hover {
		/* transform: scale(1.1); */
		border: none;
		color: var(--bg-color);
		background-color: var(--secondary-color);
	}
`;

export const Contenido = styled.div`
	display: flex;
	flex-direction: column;
    justify-content: start;

	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}

	msg {
		font-size: 36px;
		margin-bottom: 20px;
        font-family: 'Source Code Pro', sans-serif;
        color: var(--fg-color);
	}

	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;