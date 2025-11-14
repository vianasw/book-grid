import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	Modal,
	TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const fetchCoverByTitle = async (title) => {
	try {
		const q = encodeURIComponent(title);
		const res = await fetch(`https://openlibrary.org/search.json?q=${q}&limit=1`);
		if (!res.ok) return null;
		const data = await res.json();
		if (data.docs && data.docs.length && data.docs[0].cover_i) {
			return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
		}
	} catch {
		// ignore
	}
	return null;
};

const EMPTY_BOOK = { title: '', coverUrl: null, uploadedId: null, uploadedUrl: null, caption: '', link: '' };

export default function Edit({ attributes, setAttributes }) {
	const {
		books = [],
		columnsDesktop,
		columnsTablet,
		columnsMobile,
		itemMargin,
		backgroundColor,
	} = attributes;

	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [detailsIdx, setDetailsIdx] = useState(null);
	const [detailsDraft, setDetailsDraft] = useState({ caption: '', link: '' });

	const handleAddBook = async () => {
		const title = inputValue.trim();
		if (!title) return;
		setLoading(true);
		const coverUrl = await fetchCoverByTitle(title);
		setAttributes({
			books: [
				...books,
				{ ...EMPTY_BOOK, title, coverUrl: coverUrl || null },
			],
		});
		setInputValue('');
		setLoading(false);
	};

	const handleRemove = (idx) => {
		setAttributes({ books: books.filter((_, i) => i !== idx) });
	};

	const handleImageUpload = (idx, media) => {
		const updates = [...books];
		updates[idx] = {
			...updates[idx],
			uploadedId: media.id,
			uploadedUrl: media.url,
			coverUrl: null,
		};
		setAttributes({ books: updates });
	};

	const handleRemoveImage = (idx) => {
		const updates = [...books];
		updates[idx] = {
			...updates[idx],
			uploadedId: null,
			uploadedUrl: null,
		};
		setAttributes({ books: updates });
	};

	const openDetails = (idx) => {
		setDetailsIdx(idx);
		setDetailsDraft({
			caption: books[idx]?.caption || '',
			link: books[idx]?.link || '',
		});
	};
	const closeDetails = () => setDetailsIdx(null);
	const saveDetails = () => {
		const updates = [...books];
		updates[detailsIdx] = {
			...updates[detailsIdx],
			caption: detailsDraft.caption.trim(),
			link: detailsDraft.link.trim(),
		};
		setAttributes({ books: updates });
		closeDetails();
	};

	const blockProps = useBlockProps({
		style: {
			backgroundColor: backgroundColor,
			padding: 24,
			borderRadius: 10,
		},
		className: 'book-grid-block',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__( 'Grid Settings', 'book-grid-block-wp' )}>
					<RangeControl
						label={__( 'Columns (Desktop)', 'book-grid-block-wp' )}
						min={1}
						max={5}
						value={columnsDesktop}
						onChange={(v) => setAttributes({ columnsDesktop: v })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={__( 'Columns (Tablet)', 'book-grid-block-wp' )}
						min={1}
						max={5}
						value={columnsTablet}
						onChange={(v) => setAttributes({ columnsTablet: v })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={__( 'Columns (Mobile)', 'book-grid-block-wp' )}
						min={1}
						max={4}
						value={columnsMobile}
						onChange={(v) => setAttributes({ columnsMobile: v })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={__( 'Item Margin (px)', 'book-grid-block-wp' )}
						min={0}
						max={24}
						value={itemMargin}
						onChange={(v) => setAttributes({ itemMargin: v })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelColorSettings
					title={__( 'Background Color', 'book-grid-block-wp' )}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
							label: __( 'Background Color', 'book-grid-block-wp' ),
						},
					]}
				/>
			</InspectorControls>
			<div {...blockProps}>
				<div className="book-grid__controls aligned-controls">
					<TextControl
						label={__( 'Add Book by Title', 'book-grid-block-wp' )}
						value={inputValue}
						placeholder={__( 'Enter book title…', 'book-grid-block-wp' )}
						onChange={setInputValue}
						disabled={loading}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleAddBook();
								e.preventDefault();
							}
						}}
						className="add-book-title-input"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<Button
						variant="primary"
						onClick={handleAddBook}
						disabled={loading || !inputValue.trim()}
						style={{ marginLeft: 8, marginBottom: 6 }}
					>
						{loading ? __( 'Fetching…', 'book-grid-block-wp' ) : __( 'Add Book', 'book-grid-block-wp' )}
					</Button>
				</div>
				<div
					className="book-grid"
					style={{
						gridGap: `${itemMargin}px`,
						gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`
					}}
					data-cols-desktop={columnsDesktop}
					data-cols-tablet={columnsTablet}
					data-cols-mobile={columnsMobile}
				>
					{books.length === 0 && (
						<p className="book-grid__placeholder">{__( 'No books added. Add book titles above to get started!', 'book-grid-block-wp' )}</p>
					)}
					{books.map((book, idx) => (
						<div className="book-grid__item" key={idx} style={{ margin: itemMargin / 2 }}>
							<div className="book-grid__item-imgwrap">
								{book.uploadedUrl ? (
									<img
										src={book.uploadedUrl}
										alt={book.title}
										className="book-grid__cover"
										loading="lazy"
									/>
								) : book.coverUrl ? (
									<img
										src={book.coverUrl}
										alt={book.title}
										className="book-grid__cover"
										loading="lazy"
									/>
								) : (
									<div className="book-grid__cover--missing">
										{__( 'Not found', 'book-grid-block-wp' )}
									</div>
								)}
							{(book.caption) && (
								<div className="book-grid__overlay">
									<span className="book-grid__caption">
										{book.caption}
									</span>
								</div>
							)}
							<button
								type="button"
								className="book-grid__remove"
								onClick={() => handleRemove(idx)}
								title={__( 'Remove book', 'book-grid-block-wp' )}
								aria-label={__( 'Remove book', 'book-grid-block-wp' )}
							>
								<span className="book-grid__remove-x" aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="book-grid__upload-wrap">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => handleImageUpload(idx, media)}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button
											variant="secondary"
											className="book-grid__upload-btn"
											onClick={open}
											style={{ width: '100%', borderRadius: '0', marginTop: 0 }}
										>
											{__( 'Replace Cover', 'book-grid-block-wp' )}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						</div>
						<Button
							variant="secondary"
							className="book-grid__upload-btn"
							onClick={() => openDetails(idx)}
						>
							{__( 'Details', 'book-grid-block-wp' )}
						</Button>
					</div>
				))}
			</div>
		</div>
		{detailsIdx !== null && (
			<Modal
				title={__( 'Book Details', 'book-grid-block-wp' )}
				onRequestClose={closeDetails}
				shouldCloseOnClickOutside={true}
			>
				<TextControl
					label={__( 'Caption', 'book-grid-block-wp' )}
					value={detailsDraft.caption}
					onChange={v => setDetailsDraft({ ...detailsDraft, caption: v })}
					maxLength={160}
					placeholder={__( 'Enter a caption…', 'book-grid-block-wp' )}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<TextControl
					label={__( 'URL (optional link)', 'book-grid-block-wp' )}
					value={detailsDraft.link}
					onChange={v => setDetailsDraft({ ...detailsDraft, link: v })}
					placeholder="https://"
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<div style={{display:'flex', gap:8, marginTop:16}}>
					<Button variant="primary" onClick={saveDetails}>{__( 'Save', 'book-grid-block-wp' )}</Button>
					<Button onClick={closeDetails}>{__( 'Cancel', 'book-grid-block-wp' )}</Button>
				</div>
			</Modal>
		)}
	</>
	);
}
