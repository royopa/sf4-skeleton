<?php

namespace App\Controller;

use App\Entity\Unidade;
use App\Form\UnidadeType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/unidade")
 */
class UnidadeController extends Controller
{
    /**
     * @Route("/", name="unidade_index", methods="GET")
     */
    public function index(): Response
    {
        $unidades = $this->getDoctrine()
            ->getRepository(Unidade::class)
            ->findAll();

        return $this->render('unidade/index.html.twig', ['unidades' => $unidades]);
    }

    /**
     * @Route("/new", name="unidade_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $unidade = new Unidade();
        $form = $this->createForm(UnidadeType::class, $unidade);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($unidade);
            $em->flush();

            return $this->redirectToRoute('unidade_index');
        }

        return $this->render('unidade/new.html.twig', [
            'unidade' => $unidade,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="unidade_show", methods="GET")
     */
    public function show(Unidade $unidade): Response
    {
        return $this->render('unidade/show.html.twig', ['unidade' => $unidade]);
    }

    /**
     * @Route("/{id}/edit", name="unidade_edit", methods="GET|POST")
     */
    public function edit(Request $request, Unidade $unidade): Response
    {
        $form = $this->createForm(UnidadeType::class, $unidade);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('unidade_edit', ['id' => $unidade->getId()]);
        }

        return $this->render('unidade/edit.html.twig', [
            'unidade' => $unidade,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="unidade_delete", methods="DELETE")
     */
    public function delete(Request $request, Unidade $unidade): Response
    {
        if ($this->isCsrfTokenValid('delete'.$unidade->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($unidade);
            $em->flush();
        }

        return $this->redirectToRoute('unidade_index');
    }
}
