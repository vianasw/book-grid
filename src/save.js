/**
 * React hook that is used to mark the block wrapper element.
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		books = [],
		columnsDesktop,
		columnsTablet,
		columnsMobile,
		itemMargin,
		backgroundColor,
	} = attributes;

	const gridStyle = {
		gridGap: `${ itemMargin }px`,
		gridTemplateColumns: `repeat(${ columnsDesktop }, 1fr)`,
	};
	const blockStyle = {
		backgroundColor,
		padding: 24,
		borderRadius: 10,
	};

	// Helper function: render book cover image
	const renderBookCover = ( book ) => {
		if ( book.uploadedUrl ) {
			return (
				<img
					src={ book.uploadedUrl }
					alt={ book.title }
					className="book-grid__cover"
					loading="lazy"
				/>
			);
		}
		if ( book.coverUrl ) {
			return (
				<img
					src={ book.coverUrl }
					alt={ book.title }
					className="book-grid__cover"
					loading="lazy"
				/>
			);
		}
		return <div className="book-grid__cover--missing">Not found</div>;
	};

	// Helper function: wrap given children in a <a> if there is a link
	const wrapWithLink = ( link, children ) => {
		if ( link ) {
			return (
				<a
					href={ link }
					rel="noopener noreferrer"
					target="_blank"
					className="book-grid__item-link"
				>
					{ children }
				</a>
			);
		}
		return children;
	};

	return (
		<div { ...useBlockProps.save( { style: blockStyle } ) }>
			<div
				className="book-grid"
				style={ gridStyle }
				data-cols-desktop={ columnsDesktop }
				data-cols-tablet={ columnsTablet }
				data-cols-mobile={ columnsMobile }
			>
				{ books &&
					books.map( ( book, i ) => {
						const imgEl = renderBookCover( book );
						const overlayEl = book.caption ? (
							<div className="book-grid__overlay">
								<span className="book-grid__caption">
									{ book.caption }
								</span>
							</div>
						) : null;
						const imageWrap = (
							<div className="book-grid__item-imgwrap">
								{ imgEl }
								{ overlayEl }
							</div>
						);
						return (
							<div
								className="book-grid__item"
								key={ i }
								style={ { margin: itemMargin / 2 } }
							>
								{ wrapWithLink( book.link, imageWrap ) }
							</div>
						);
					} ) }
			</div>
		</div>
	);
}
