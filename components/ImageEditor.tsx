
import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/gemini';
import { ImageEditState } from '../types';

const ImageEditor: React.FC = () => {
  const [state, setState] = useState<ImageEditState>({
    uploadedImages: [],
    selectedImageIndex: 0,
    editedImage: null,
    isProcessing: false,
    error: null,
  });
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const readers = Array.from(files).map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (readerEvent) => resolve(readerEvent.target?.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(results => {
        setState(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, ...results],
          editedImage: null,
          error: null
        }));
      });
    }
  };

  const handleEdit = async () => {
    const currentImage = state.uploadedImages[state.selectedImageIndex];
    if (!currentImage || !prompt) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    try {
      const resultUrl = await editImageWithGemini(currentImage, prompt);
      setState(prev => ({ ...prev, editedImage: resultUrl, isProcessing: false }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'AI processing failed. Please try a simpler prompt.', isProcessing: false }));
    }
  };

  const handleDownload = () => {
    if (!state.editedImage) return;
    const link = document.createElement('a');
    link.href = state.editedImage;
    link.download = `ui-nashville-edit-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setState({
      uploadedImages: [],
      selectedImageIndex: 0,
      editedImage: null,
      isProcessing: false,
      error: null,
    });
    setPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-sm font-black text-[#509E2F] uppercase tracking-widest mb-4 italic">Interactive Souvenir</h2>
        <h3 className="text-3xl font-serif font-bold mb-6 text-slate-800">UI Nashville Magic Tool</h3>
        <p className="text-slate-500 mb-12 max-w-xl mx-auto text-sm">
          Snap photos in Nashville and use our AI to add custom branding or local flair. Upload multiple shots and pick your favorite to transform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {/* Upload & Preview Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative shadow-sm group hover:border-[#FF8200] transition-colors">
              {state.uploadedImages.length > 0 ? (
                <img src={state.uploadedImages[state.selectedImageIndex]} className="w-full h-full object-cover" alt="Selected for editing" />
              ) : (
                <div className="p-10 text-center">
                  <div className="w-20 h-20 bg-orange-50 text-[#FF8200] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FF8200] hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 transition-all"
                  >
                    Upload Photos
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            
            {/* Gallery Strip */}
            {state.uploadedImages.length > 0 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {state.uploadedImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setState(prev => ({ ...prev, selectedImageIndex: idx, editedImage: null }))}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${state.selectedImageIndex === idx ? 'border-[#FF8200] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Upload ${idx}`} />
                  </button>
                ))}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0 w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-[#FF8200] hover:border-[#FF8200] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
                <div className="flex-1"></div>
                <button 
                  onClick={clearAll}
                  className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* AI Result Section */}
          <div className="aspect-square bg-white rounded-[2rem] overflow-hidden border border-slate-200 flex items-center justify-center relative shadow-sm">
            {state.isProcessing ? (
              <div className="flex flex-col items-center p-8">
                <div className="w-14 h-14 border-4 border-[#FF8200] border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-slate-800 font-black uppercase tracking-widest text-[10px]">Processing AI Magic...</p>
              </div>
            ) : state.editedImage ? (
              <div className="w-full h-full relative group">
                <img src={state.editedImage} className="w-full h-full object-cover" alt="Edited result" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <button 
                    onClick={handleDownload}
                    className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Result
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12">
                <p className="text-slate-300 text-sm font-bold uppercase tracking-widest italic">Preview Output</p>
                <p className="text-slate-300 text-[10px] mt-2 font-medium">Select an image and enter a prompt to see results</p>
              </div>
            )}
          </div>
        </div>

        {state.uploadedImages.length > 0 && (
          <div className="max-w-xl mx-auto space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Describe your change (e.g. 'Add a Tennessee glow')"
                className="w-full px-8 py-5 bg-white border-2 border-slate-100 rounded-2xl text-slate-800 outline-none focus:border-[#FF8200] shadow-xl shadow-slate-100 transition-all font-medium"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#509E2F]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4.000z"></path></svg>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                disabled={state.isProcessing || !prompt}
                onClick={handleEdit}
                className="flex-1 py-5 bg-[#509E2F] hover:bg-[#458a28] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-xl shadow-green-100 text-lg uppercase tracking-widest active:scale-[0.98]"
              >
                Apply AI Magic
              </button>
              {state.editedImage && (
                <button 
                  onClick={handleDownload}
                  className="px-6 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200"
                  title="Download Edited Image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
              )}
            </div>
            {state.error && <p className="text-red-500 text-xs font-bold uppercase tracking-wider animate-bounce">{state.error}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageEditor;