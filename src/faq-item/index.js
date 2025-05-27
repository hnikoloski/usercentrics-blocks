/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InnerBlocks
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Block metadata
 */
import metadata from './block.json';

/**
 * FAQ Item Block Edit Component
 */
function Edit({ attributes, setAttributes, clientId }) {
    const { question } = attributes;
    const blockProps = useBlockProps({
        className: 'usercentrics-faq__item-editor'
    });

    // Get block utilities from WordPress
    const { getBlockIndex, getBlockRootClientId, getAdjacentBlockClientId } = useSelect(select => {
        const { getBlockIndex, getBlockRootClientId, getAdjacentBlockClientId } = select('core/block-editor');
        return {
            getBlockIndex,
            getBlockRootClientId,
            getAdjacentBlockClientId
        };
    }, []);

    const { moveBlocksUp, moveBlocksDown, removeBlock } = useDispatch('core/block-editor');

    // Get current block index and parent
    const blockIndex = getBlockIndex(clientId);
    const rootClientId = getBlockRootClientId(clientId);

    // Get previous and next blocks
    const previousBlockClientId = getAdjacentBlockClientId(clientId, -1);
    const nextBlockClientId = getAdjacentBlockClientId(clientId, 1);

    // Check if we can move up/down
    const canMoveUp = !!previousBlockClientId;
    const canMoveDown = !!nextBlockClientId;

    // Handler functions
    const handleMoveUp = () => moveBlocksUp([clientId], rootClientId);
    const handleMoveDown = () => moveBlocksDown([clientId], rootClientId);
    const handleRemove = () => removeBlock(clientId);

    const ALLOWED_BLOCKS = [
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/image',
        'core/quote',
        'core/table',
        'core/button',
        'core/separator',
        'core/spacer'
    ];

    const TEMPLATE = [
        ['core/paragraph', { placeholder: 'Enter your answer...' }]
    ];

    return (
        <div {...blockProps}>
            <div className="usercentrics-faq__editor-header">
                <span className="usercentrics-faq__editor-label">
                    {__('FAQ Item', 'usercentrics-blocks')} {blockIndex + 1}
                </span>
                <div className="usercentrics-faq__item-controls">
                    <Button
                        onClick={handleMoveUp}
                        disabled={!canMoveUp}
                        label={__('Move up', 'usercentrics-blocks')}
                        size="small"
                        variant="secondary"
                        className="usercentrics-faq__control-button"
                    >
                        ↑
                    </Button>
                    <Button
                        onClick={handleMoveDown}
                        disabled={!canMoveDown}
                        label={__('Move down', 'usercentrics-blocks')}
                        size="small"
                        variant="secondary"
                        className="usercentrics-faq__control-button"
                    >
                        ↓
                    </Button>
                    <Button
                        onClick={handleRemove}
                        isDestructive
                        label={__('Remove item', 'usercentrics-blocks')}
                        size="small"
                        className="usercentrics-faq__control-button usercentrics-faq__control-button--delete"
                    >
                        ×
                    </Button>
                </div>
            </div>

            <div className="usercentrics-faq__item">
                <div className="usercentrics-faq__question-wrapper">
                    <label className="usercentrics-faq__field-label">
                        {__('Question', 'usercentrics-blocks')}
                    </label>
                    <RichText
                        tagName="div"
                        className="usercentrics-faq__question-editor"
                        value={question}
                        onChange={(value) => setAttributes({ question: value })}
                        placeholder={__('Enter your question...', 'usercentrics-blocks')}
                        allowedFormats={['core/bold', 'core/italic']}
                        disableLineBreaks={true}
                    />
                </div>

                <div className="usercentrics-faq__answer-wrapper">
                    <label className="usercentrics-faq__field-label">
                        {__('Answer', 'usercentrics-blocks')}
                    </label>
                    <div className="usercentrics-faq__answer-editor">
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            templateLock={false}
                            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * FAQ Item Block Save Component
 */
function Save({ attributes }) {
    const { question } = attributes;
    const blockProps = useBlockProps.save({
        className: 'usercentrics-faq__item',
        'data-faq-item': true,
        itemScope: true,
        itemType: 'https://schema.org/Question'
    });

    return (
        <div {...blockProps}>
            <button
                className="usercentrics-faq__question"
                aria-expanded="false"
                data-faq-toggle
                itemProp="name"
            >
                <span className="usercentrics-faq__question-text">
                    <RichText.Content value={question} />
                </span>
                <span className="usercentrics-faq__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10H15M10 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
            <div
                className="usercentrics-faq__answer"
                role="region"
                hidden
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
            >
                <div className="usercentrics-faq__answer-content" itemProp="text">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}

/**
 * Register the FAQ Item block
 */
registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
}); 