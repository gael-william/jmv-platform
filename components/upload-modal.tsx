"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  ImageIcon,
  LockKeyhole,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  Upload,
  UserRound,
  Video,
} from "lucide-react";
import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadPost, type UploadPostPayload } from "@/lib/api";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 border-white/12 bg-white/8 text-white placeholder:text-white/32 focus-visible:border-[#d9b166]/60 focus-visible:ring-[#d9b166]/20";

const fieldGroups = [
  { id: "modelName", label: "Nom du mannequin", placeholder: "Aurelia Noire", icon: UserRound },
  { id: "photographer", label: "Photographe", placeholder: "Studio ou artiste", icon: Camera },
  { id: "stylist", label: "Styliste", placeholder: "Direction silhouette / styling", icon: Sparkles },
  { id: "tags", label: "Tags", placeholder: "runway, couture, chrome", icon: Tag },
] as const;

export type UploadModalProps = {
  onUploadSuccess?: () => void;
};

export function UploadModal({ onUploadSuccess }: UploadModalProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    modelName: "",
    photographer: "",
    stylist: "",
    tags: "",
  });
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const MAX_UPLOAD_SIZE = 50 * 1024 * 1024;
  const acceptedFileTypes = ["image/", "video/"];

  const fileRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  function updateFormField(field: keyof typeof formState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setPassword("");
      setError("");
      setFormState({
        title: "",
        description: "",
        category: "",
        modelName: "",
        photographer: "",
        stylist: "",
        tags: "",
      });
      setAuthorized(false);
      setMediaType("image");
      setSelectedFile(null);
      setPreviewUrl("");
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
      }
      setUploadProgress(0);
      setDragActive(false);
      setLoading(false);
      setUploadSuccess(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === "00000") {
      setError("");
      setAuthorized(true);
      return;
    }

    setError("Code d’accès refusé. Vérifiez le mot de passe du studio sécurisé.");
  }

  function isSupportedFile(file: File) {
    return acceptedFileTypes.some((prefix) => file.type.startsWith(prefix));
  }

  function attachSelectedFile(file: File | null) {
    setError("");
    if (!file) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
      }
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    if (!isSupportedFile(file)) {
      setError("Format non pris en charge. Ajoutez une image ou une vidéo.");
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setError("Fichier trop volumineux. La limite est de 50 Mo.");
      return;
    }

    const fileType = file.type.startsWith("video/") ? "video" : "image";
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;
    setMediaType(fileType);
    setSelectedFile(file);
    setPreviewUrl(nextPreviewUrl);
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    attachSelectedFile(file);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    attachSelectedFile(file);
  }

  async function handleUploadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate file selection
      if (!selectedFile) {
        setError("Sélectionnez une image ou une vidéo à publier.");
        setLoading(false);
        return;
      }

      if (!isSupportedFile(selectedFile)) {
        setError("Format non pris en charge. Ajoutez une image ou une vidéo.");
        setLoading(false);
        return;
      }

      if (selectedFile.size > MAX_UPLOAD_SIZE) {
        setError("Fichier trop volumineux. La limite est de 50 Mo.");
        setLoading(false);
        return;
      }

      // Validate title and description
      const title = formState.title.trim();
      const description = formState.description.trim();

      if (!title) {
        setError("Ajoutez un titre à votre publication.");
        setLoading(false);
        return;
      }

      if (!description) {
        setError("Ajoutez une description à votre publication.");
        setLoading(false);
        return;
      }

      // Parse tags
      const tagsValue = formState.tags.trim();
      const tags = tagsValue
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      // Build upload payload
      const payload: UploadPostPayload = {
        title,
        description,
        mediaType,
        file: selectedFile,
        category: formState.category || undefined,
        modelName: formState.modelName.trim() || undefined,
        photographer: formState.photographer.trim() || undefined,
        stylist: formState.stylist.trim() || undefined,
        tags: tags.length > 0 ? tags : undefined,
      };

      setUploadProgress(0);
      const result = await uploadPost(payload, {
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          setUploadProgress(Math.min(96, Math.round((progressEvent.loaded / progressEvent.total) * 96)));
        },
      });

      if (result && result.id) {
        setUploadProgress(100);
        setUploadSuccess(true);
        onUploadSuccess?.();

        setTimeout(() => {
          handleOpenChange(false);
        }, 2000);
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: string }).message)
          : "La publication a échoué. Réessayez dans un instant.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className="fixed bottom-5 right-5 z-[999] grid size-14 place-items-center rounded-full border border-white/20 bg-white text-black shadow-[0_0_45px_rgba(255,255,255,0.32)] transition hover:scale-105 hover:bg-[#d9b166] sm:bottom-7 sm:right-7"
        aria-label="Ouvrir la publication sécurisée"
      >
        <Upload className="size-5" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn(
            "max-h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] overflow-hidden rounded-[8px] border border-white/12 bg-black/88 p-0 text-white shadow-[0_0_110px_rgba(217,177,102,0.18)] ring-white/10 backdrop-blur-2xl sm:max-h-[calc(100svh-2rem)]",
            authorized ? "sm:max-w-5xl" : "sm:max-w-md"
          )}
        >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,177,102,0.18),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(217,177,102,0.9),transparent)]" />

        <AnimatePresence mode="wait">
          {!authorized ? (
            <motion.form
              key="password"
              onSubmit={handlePasswordSubmit}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative grid gap-5 p-6 sm:p-8"
            >
              <DialogHeader>
                <div className="mb-2 grid size-12 place-items-center rounded-full border border-[#d9b166]/30 bg-[#d9b166]/10 text-[#d9b166] shadow-[0_0_30px_rgba(217,177,102,0.18)]">
                  <LockKeyhole className="size-5" />
                </div>
                <DialogTitle className="text-2xl font-semibold">
                  Accès studio sécurisé
                </DialogTitle>
                <DialogDescription className="text-white/50">
                  Saisissez le code privé du studio pour ouvrir la suite de publication JMV Vision.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-2">
                <label
                  htmlFor="upload-password"
                  className="text-xs uppercase tracking-[0.24em] text-white/42"
                >
                  Mot de passe d’accès
                </label>
                <Input
                  id="upload-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="00000"
                  className={inputClass}
                  autoFocus
                />
              </div>

              {error ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-300" />
                  {error}
                </motion.p>
              ) : null}

              <Button
                type="submit"
                className="h-12 rounded-full bg-white text-black shadow-[0_0_42px_rgba(255,255,255,0.16)] hover:bg-[#d9b166]"
              >
                Déverrouiller la suite
                <ShieldCheck className="size-4" />
              </Button>
            </motion.form>
          ) : uploadSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative grid gap-6 p-6 text-center sm:p-8"
            >
              <motion.div
                className="mx-auto grid size-16 place-items-center rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <CheckCircle className="size-8" />
                </motion.div>
              </motion.div>

              <div>
                <h3 className="text-2xl font-semibold">Publication en ligne</h3>
                <p className="mt-2 text-white/50">
                  Votre contenu est désormais visible sur JMV Vision. Le flux se mettra à jour automatiquement.
                </p>
              </div>

              <motion.div
                className="h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <motion.form
              key="upload"
              onSubmit={handleUploadSubmit}
              initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="relative flex max-h-[calc(100svh-1rem)] flex-col sm:max-h-[calc(100svh-2rem)]"
            >
              <div className="border-b border-white/10 p-6 sm:p-8">
                <DialogHeader>
                  <p className="text-xs uppercase tracking-[0.34em] text-[#d9b166]">
                    Publication studio autorisée
                  </p>
                  <DialogTitle className="text-3xl font-semibold sm:text-4xl">
                    Publier un média mode
                  </DialogTitle>
                  <DialogDescription className="max-w-2xl text-white/50">
                    Ajoutez une image ou une vidéo curatée avec ses métadonnées de production.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="jmv-scrollbar grid gap-6 overflow-y-auto overscroll-contain p-5 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="field-label">
                      Titre <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="title"
                      value={formState.title}
                      onChange={(event) => updateFormField("title", event.target.value)}
                      placeholder="Éditorial runway chrome"
                      className={inputClass}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="description" className="field-label">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <Textarea
                      id="description"
                      value={formState.description}
                      onChange={(event) => updateFormField("description", event.target.value)}
                      placeholder="Décrivez l’ambiance campagne, les pièces, le lieu et l’histoire visuelle."
                      className="min-h-36 border-white/12 bg-white/8 text-white placeholder:text-white/32 focus-visible:border-[#d9b166]/60 focus-visible:ring-[#d9b166]/20 disabled:opacity-60"
                      disabled={loading}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="category" className="field-label">
                      Catégorie
                    </label>
                    <select
                      id="category"
                      className="h-11 rounded-lg border border-white/12 bg-black/60 px-3 text-sm text-white outline-none transition focus:border-[#d9b166]/60 focus:ring-3 focus:ring-[#d9b166]/20 disabled:opacity-60"
                      value={formState.category}
                      onChange={(event) => updateFormField("category", event.target.value)}
                      disabled={loading}
                    >
                      <option value="" disabled>
                        Choisir une catégorie
                      </option>
                      <option value="Editorial">Éditorial</option>
                      <option value="Runway">Runway</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Motion">Motion</option>
                      <option value="Campaign">Campagne</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {fieldGroups.map((field) => {
                      const Icon = field.icon;

                      return (
                        <div key={field.id} className="grid gap-2">
                          <label htmlFor={field.id} className="field-label">
                            {field.label}
                          </label>
                          <div className="relative">
                            <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#d9b166]" />
                            <Input
                              id={field.id}
                              value={formState[field.id]}
                              onChange={(event) => updateFormField(field.id, event.target.value)}
                              placeholder={field.placeholder}
                              className={cn(inputClass, "pl-9")}
                              disabled={loading}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid gap-2">
                    <span className="field-label">Type de média</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "image" as const, label: "Image", icon: ImageIcon },
                        { value: "video" as const, label: "Vidéo", icon: Video },
                      ].map((option) => {
                        const Icon = option.icon;
                        const isSelected = mediaType === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => !loading && setMediaType(option.value)}
                            disabled={loading}
                            className={cn(
                              "flex h-12 items-center justify-center gap-2 border text-sm transition",
                              isSelected
                                ? "border-[#d9b166]/70 bg-[#d9b166]/18 text-white shadow-[0_0_30px_rgba(217,177,102,0.12)]"
                                : "border-white/12 bg-white/7 text-white/58 hover:bg-white/10 hover:text-white disabled:opacity-60",
                              loading && "opacity-60"
                            )}
                          >
                            <Icon className="size-4" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label
                    htmlFor="media-file"
                    className={cn(
                      "group relative grid min-h-44 cursor-pointer place-items-center overflow-hidden rounded-3xl border border-dashed bg-white/7 px-5 py-5 text-center transition duration-200",
                      dragActive
                        ? "border-[#d9b166] bg-[#d9b166]/15 shadow-[0_0_40px_rgba(217,177,102,0.16)]"
                        : "border-white/18 hover:border-[#d9b166]/60 hover:bg-[#d9b166]/10",
                      loading && "opacity-60 cursor-not-allowed"
                    )}
                    onDragEnter={handleDragOver}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileRef}
                      id="media-file"
                      type="file"
                      className="sr-only"
                      accept="image/*,video/*"
                      onChange={handleFileInputChange}
                      disabled={loading}
                    />

                    {selectedFile ? (
                      <div className="grid gap-3">
                        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80 shadow-[inset_0_0_45px_rgba(0,0,0,0.45)]">
                          {mediaType === "image" ? (
                            <img
                              src={previewUrl}
                              alt={selectedFile.name}
                              className="h-56 w-full object-cover"
                            />
                          ) : (
                            <video
                              src={previewUrl}
                              controls
                              className="h-56 w-full rounded-[1.5rem] bg-black object-cover"
                            />
                          )}
                        </div>

                        <div className="space-y-1 text-left text-white">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="truncate text-sm font-semibold">{selectedFile.name}</p>
                              <p className="text-xs text-white/50">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB / {mediaType}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                attachSelectedFile(null);
                                if (fileRef.current) fileRef.current.value = "";
                              }}
                              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10"
                            >
                              Retirer
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="grid gap-3">
                        <span className="mx-auto grid size-12 place-items-center rounded-full border border-white/16 bg-black/35 text-[#d9b166] transition group-hover:scale-105">
                          <Upload className="size-5" />
                        </span>
                        <span className="text-sm font-medium">
                          {dragActive ? "Déposez votre média" : "Déposez une image ou vidéo, ou parcourez"}
                        </span>
                        <span className="text-xs leading-5 text-white/42">
                          Visuels jusqu’à 50 Mo. Images et vidéos sont acceptées.
                        </span>
                      </span>
                    )}
                  </label>

                  {(loading || uploadProgress > 0) && (
                    <div className="mt-4 space-y-2 text-left">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-white/50">
                        <span>Statut de publication</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#d9b166] via-[#f9e16d] to-[#ffffff] transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-red-400/20 bg-red-500/10 px-6 py-4 sm:px-8"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-300" />
                    <p className="text-sm leading-6 text-red-100">{error}</p>
                  </div>
                </motion.div>
              ) : null}

              <DialogFooter className="border-t border-white/10 bg-white/5 px-6 py-4 sm:px-8">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 rounded-full bg-white px-6 text-black hover:bg-[#d9b166] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Upload className="size-4" />
                      </motion.div>
                      Publication...
                    </>
                  ) : (
                    <>
                      Publier
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </motion.form>
          )}
        </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
