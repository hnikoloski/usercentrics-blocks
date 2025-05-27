/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    RichText,
    InnerBlocks
} from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    RangeControl
} from '@wordpress/components';

/**
 * Block metadata
 */
import metadata from './block.json';

/**
 * Main FAQ Block Edit Component
 */
function Edit({ attributes, setAttributes }) {
    const {
        title,
        allowMultipleOpen,
        showTitle,
        titleLevel
    } = attributes;

    const blockProps = useBlockProps({
        className: 'usercentrics-faq'
    });

    // Only allow FAQ Item blocks as children
    const ALLOWED_BLOCKS = ['usercentrics/faq-item'];

    // Set a default template with one FAQ item
    const TEMPLATE = [
        ['usercentrics/faq-item', {}]
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('FAQ Settings', 'usercentrics-blocks')}>
                    <ToggleControl
                        label={__('Show Title', 'usercentrics-blocks')}
                        checked={showTitle}
                        onChange={(value) => setAttributes({ showTitle: value })}
                    />
                    {showTitle && (
                        <RangeControl
                            label={__('Title Level', 'usercentrics-blocks')}
                            value={titleLevel}
                            onChange={(value) => setAttributes({ titleLevel: value })}
                            min={1}
                            max={6}
                        />
                    )}
                    <ToggleControl
                        label={__('Allow Multiple Open', 'usercentrics-blocks')}
                        checked={allowMultipleOpen}
                        onChange={(value) => setAttributes({ allowMultipleOpen: value })}
                        help={__('Allow multiple FAQ items to be open at the same time', 'usercentrics-blocks')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {showTitle && (
                    <RichText
                        tagName={`h${titleLevel}`}
                        className="usercentrics-faq__title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('FAQ Title', 'usercentrics-blocks')}
                    />
                )}

                <div className="usercentrics-faq__container">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        templateLock={false}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </div>
        </>
    );
}

/**
 * Main FAQ Block Save Component
 */
function Save({ attributes }) {
    const {
        title,
        allowMultipleOpen,
        showTitle,
        titleLevel
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'usercentrics-faq',
        itemScope: true,
        itemType: 'https://schema.org/FAQPage'
    });

    return (
        <div {...blockProps}>
            {showTitle && title && (
                <RichText.Content
                    tagName={`h${titleLevel}`}
                    className="usercentrics-faq__title"
                    value={title}
                    itemProp="name"
                />
            )}

            <div
                className="usercentrics-faq__container"
                data-allow-multiple={allowMultipleOpen ? 'true' : 'false'}
            >
                <InnerBlocks.Content />
            </div>
        </div>
    );
}

/**
 * Register main FAQ block
 */
registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
}); 