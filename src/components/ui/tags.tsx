import React from 'react';
import { Badge } from "@/components/ui/badge";

interface TagsProps {
    tags: string[];
    maxLength?: number;
}

const colors = [{
    background: "#EBF9F1",
    text: "#1F9254"
}, {
    background: "#FDE6EB",
    text: "#B31A5B"
}]

// Function to generate consistent colors based on the tag text
const generateColors = (tag: string) => {
    const charCode = tag.charCodeAt(0);
    const index = charCode % colors.length;
    return colors[index];
};

const Tags: React.FC<TagsProps> = ({
    tags,
    maxLength = 5
}) => {
    // Slice the tags to show only up to maxLength
    const displayedTags = tags.slice(0, maxLength);
    const remainingTagsCount = Math.max(0, tags.length - maxLength);

    return (
        <div className="flex flex-wrap items-center gap-2">
            {displayedTags.map((tag) => {
                const { background, text } = generateColors(tag);
                return (
                    <Badge
                        key={tag}
                        className="px-4 py-4 h-8 rounded-sm"
                        style={{
                            backgroundColor: background,
                            color: text,
                        }}
                    >
                        {tag}
                    </Badge>
                );
            })}

            {remainingTagsCount > 0 && (
                <Badge
                    variant="outline"
                    className="flex items-center justify-between rounded-full size-8"
                >{remainingTagsCount}</Badge>
            )}
        </div>
    );
};

export default Tags;