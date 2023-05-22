import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Button } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'

const GenericPdfDownloader = ({
	rootElementId,
	downloadFileName,
	handleClick,
	isDisable = false,
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const downloadPdfDocument = () => {
		setIsLoading(true)
		const input = document.getElementById(rootElementId)
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL('image/png')
			const pdf = new jsPDF()
			pdf.addImage(imgData, 'JPEG', 50, 50)
			pdf.save(`${downloadFileName}.pdf`)
			handleClick()
			setIsLoading(false)
		})
	}

	return (
		<Button
			className="w-100 btn btn-primary"
			id="download_receipt_button"
			onClick={downloadPdfDocument}
			disabled={isDisable}
		>
			{isLoading ? (
				<ClipLoader
					color="#fff"
					size={30}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			) : (
				'Download Receipt'
			)}
		</Button>
	)
}

export default GenericPdfDownloader
