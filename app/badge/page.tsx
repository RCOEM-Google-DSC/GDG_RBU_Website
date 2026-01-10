'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
const BadgeGenerator = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [compositeImage, setCompositeImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateBadge = () => {
        if (!uploadedImage || !canvasRef.current) return;

        setIsProcessing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to 1080x1350 (4:5 portrait ratio)
        const targetWidth = 1080;
        const targetHeight = 1350;
        const targetAspect = targetWidth / targetHeight; // 0.8 (4:5)

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const userImg = new window.Image();
        const badgeImg = new window.Image();

        userImg.onload = () => {
            // Calculate user image aspect ratio
            const userAspect = userImg.width / userImg.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            // Add transparent padding to match target aspect ratio
            if (Math.abs(userAspect - targetAspect) < 0.01) {
                // Image already matches aspect ratio
                drawWidth = targetWidth;
                drawHeight = targetHeight;
                offsetX = 0;
                offsetY = 0;
            } else if (userAspect > targetAspect) {
                // Image is wider - add padding top and bottom
                drawWidth = targetWidth;
                drawHeight = drawWidth / userAspect;
                offsetX = 0;
                offsetY = (targetHeight - drawHeight) / 2;
            } else {
                // Image is taller - add padding left and right
                drawHeight = targetHeight;
                drawWidth = drawHeight * userAspect;
                offsetX = (targetWidth - drawWidth) / 2;
                offsetY = 0;
            }

            // Fill canvas with transparent background
            ctx.clearRect(0, 0, targetWidth, targetHeight);

            // Draw user's image centered with padding
            ctx.drawImage(userImg, offsetX, offsetY, drawWidth, drawHeight);

            badgeImg.onload = () => {
                // Calculate badge scaling to cover the canvas
                const badgeAspect = badgeImg.width / badgeImg.height;

                let badgeDrawWidth, badgeDrawHeight, badgeOffsetX, badgeOffsetY;

                // Scale badge to cover the canvas while maintaining aspect ratio
                if (badgeAspect > targetAspect) {
                    // Badge is wider - fit to height
                    badgeDrawHeight = targetHeight;
                    badgeDrawWidth = badgeDrawHeight * badgeAspect;
                    badgeOffsetX = (targetWidth - badgeDrawWidth) / 2;
                    badgeOffsetY = 0;
                } else {
                    // Badge is taller or same - fit to width
                    badgeDrawWidth = targetWidth;
                    badgeDrawHeight = badgeDrawWidth / badgeAspect;
                    badgeOffsetX = 0;
                    badgeOffsetY = (targetHeight - badgeDrawHeight) / 2;
                }

                // Draw badge overlay centered and scaled
                ctx.drawImage(badgeImg, badgeOffsetX, badgeOffsetY, badgeDrawWidth, badgeDrawHeight);

                // Convert canvas to data URL
                const dataUrl = canvas.toDataURL('image/png');
                setCompositeImage(dataUrl);
                setIsProcessing(false);
            };

            badgeImg.src = '/techsprintBadge.png';
        };

        userImg.src = uploadedImage;
    };

    useEffect(() => {
        if (uploadedImage) {
            generateBadge();
        }
    }, [uploadedImage]);

    const handleDownload = () => {
        if (!compositeImage) return;

        const link = document.createElement('a');
        link.download = 'techsprint-badge.png';
        link.href = compositeImage;
        link.click();
    };

    const handleReset = () => {
        setUploadedImage(null);
        setCompositeImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-white text-black pt-15 pb-20">
            {/* Grid Background */}
            <div
                className="fixed inset-0 -z-10 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content - Horizontal Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left: Heading */}
                    <div className="lg:sticky lg:top-24">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] font-retron fade-in-20 delay-500">
                            Badge
                            <br />
                            Generator
                        </h1>
                        <p className="mt-6 text-lg md:text-xl font-bold">
                            Upload your photo and get your personalized TechSprint badge
                        </p>
                    </div>

                    {/* Right: Upload or Result */}
                    <div
                        className="bg-white p-6 md:p-10"
                        style={{
                            border: '4px solid #000000',
                            boxShadow: '8px 8px 0px #000000',
                        }}
                    >
                        {!compositeImage ? (
                            /* Upload Section */
                            <div className="space-y-6">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full aspect-4/5 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition-colors group"
                                    style={{
                                        border: '4px dashed #000000',
                                    }}
                                >
                                    {uploadedImage ? (
                                        <div className="relative w-full h-full p-4">
                                            <Image
                                                width={200}
                                                height={200}
                                                src={uploadedImage}
                                                alt="Uploaded"
                                                className="w-full h-full object-cover"
                                                style={{
                                                    border: '3px solid #000000',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center p-8">
                                            <svg
                                                className="mx-auto h-20 w-20 md:h-24 md:w-24 text-black group-hover:scale-110 transition-transform"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                strokeWidth={3}
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <p className="mt-6 text-xl md:text-2xl font-black uppercase tracking-wide">
                                                Click to Upload
                                            </p>
                                            <p className="mt-2 text-sm md:text-base font-bold">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                {isProcessing && (
                                    <div className="text-center py-6">
                                        <div
                                            className="inline-block w-16 h-16 border-4 border-black border-t-transparent animate-spin"
                                        ></div>
                                        <p className="mt-4 text-xl font-black uppercase">Generating...</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Preview & Download Section */
                            <div className="space-y-6">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="relative w-full aspect-[4/5] overflow-hidden bg-white"
                                        style={{
                                            border: '4px solid #000000',
                                            boxShadow: '6px 6px 0px #000000',
                                        }}
                                    >
                                        <Image
                                            width={200}
                                            height={200}
                                            src={compositeImage}
                                            alt="Badge Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleDownload}
                                        className="w-full px-8 py-4 text-base md:text-lg font-black uppercase tracking-wide bg-black text-white transition-all duration-200 hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-3"
                                        style={{
                                            border: '3px solid #000000',
                                            boxShadow: '4px 4px 0px #000000',
                                        }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                        Download Badge
                                    </button>

                                    <button
                                        onClick={handleReset}
                                        className="w-full px-8 py-4 text-base md:text-lg font-black uppercase tracking-wide bg-white text-black transition-all duration-200 hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-3"
                                        style={{
                                            border: '3px solid #000000',
                                            boxShadow: '4px 4px 0px #000000',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#000000';
                                            e.currentTarget.style.color = '#ffffff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ffffff';
                                            e.currentTarget.style.color = '#000000';
                                        }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Create Another
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hidden Canvas */}
                <canvas ref={canvasRef} className="hidden" />

            </div>
        </div>
    );
};

export default BadgeGenerator;